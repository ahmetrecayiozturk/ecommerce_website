"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const Iyzipay = require("iyzipay");
// --- TCKN DOĞRULAMA ALGORİTMASI ---
function isValidTCKN(tc) {
    if (!tc || !/^[1-9][0-9]{10}$/.test(tc))
        return false;
    const digits = tc.split('').map(Number);
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
    const tenthDigit = (oddSum * 7 - evenSum) % 10;
    if (tenthDigit !== digits[9])
        return false;
    const totalSum = digits.slice(0, 10).reduce((a, b) => a + b, 0);
    if (totalSum % 10 !== digits[10])
        return false;
    return true;
}
class IyzicoPaymentProviderService extends utils_1.AbstractPaymentProvider {
    constructor(container, options) {
        super(container, options);
        this.options_ = options;
        this.client_ = new Iyzipay({
            apiKey: options.api_key,
            secretKey: options.secret_key,
            uri: options.base_url,
        });
    }
    async initiatePayment(input) {
        const { amount, currency_code, context } = input;
        const customer = context?.customer;
        const conversationId = `cart_${context?.resource_id ?? Date.now()}`;
        // TC'yi çekiyoruz ve temizliyoruz (baş/son boşlukları siliniyor)
        const rawIdentityNumber = customer?.metadata?.identity_number;
        const identityNumber = rawIdentityNumber ? String(rawIdentityNumber).trim() : "";
        // TC KİMLİK KONTROLÜ (Boş mu veya Yanlış mı?)
        if (!isValidTCKN(identityNumber)) {
            return {
                id: conversationId,
                data: {
                    error: "Ödeme yapabilmek için lütfen Profil sayfanızdan geçerli bir TC Kimlik Numarası giriniz (Yasal Zorunluluk).",
                },
            };
        }
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId,
            price: this.toIyzicoAmount(amount),
            paidPrice: this.toIyzicoAmount(amount),
            currency: this.mapCurrency(currency_code),
            basketId: conversationId,
            callbackUrl: `${process.env.MEDUSA_BACKEND_URL}/iyzico/callback`,
            enabledInstallments: [1, 2, 3, 6, 9],
            buyer: {
                id: customer?.id ?? "guest",
                name: customer?.first_name || "Musteri",
                surname: customer?.last_name || "-",
                email: customer?.email || "guest@example.com",
                identityNumber: identityNumber, // Artık tamamen doğrulanmış ve dolu bir TC gidiyor
                registrationAddress: customer?.billing_address?.address_1 || "Adres belirtilmedi",
                ip: context?.ip_address || "127.0.0.1",
                city: customer?.billing_address?.city || "Istanbul",
                country: customer?.billing_address?.country_code || "Turkey",
            },
            shippingAddress: this.mapAddress(customer?.shipping_address),
            billingAddress: this.mapAddress(customer?.billing_address),
            basketItems: [
                {
                    id: conversationId,
                    name: "Siparis",
                    category1: "Genel",
                    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                    price: this.toIyzicoAmount(amount),
                },
            ],
        };
        const callIyzico = () => new Promise((resolve, reject) => {
            this.client_.checkoutFormInitialize.create(request, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        let lastError = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const result = await callIyzico();
                console.log("IYZICO RESULT:", JSON.stringify(result));
                if (result.status !== "success") {
                    return {
                        id: conversationId,
                        data: {
                            error: result?.errorMessage || "iyzico baslatma hatasi",
                        },
                    };
                }
                return {
                    id: conversationId,
                    data: {
                        token: result.token,
                        checkoutFormContent: result.checkoutFormContent,
                        paymentPageUrl: result.paymentPageUrl,
                        conversationId,
                    },
                };
            }
            catch (err) {
                lastError = err;
                console.log(`IYZICO ERROR (deneme ${attempt}/3):`, JSON.stringify(err));
                await new Promise((r) => setTimeout(r, 500));
            }
        }
        return {
            id: conversationId,
            data: {
                error: lastError?.message || "iyzico'ya baglanilamadi (3 deneme basarisiz)",
            },
        };
    }
    async authorizePayment(input) {
        const token = input.data?.token;
        if (!token) {
            return {
                data: input.data,
                status: "pending",
            };
        }
        return new Promise((resolve) => {
            this.client_.checkoutForm.retrieve({ locale: Iyzipay.LOCALE.TR, token }, (err, result) => {
                if (err || result.status !== "success" || result.paymentStatus !== "SUCCESS") {
                    resolve({
                        data: input.data,
                        status: "error",
                    });
                    return;
                }
                resolve({
                    data: {
                        ...input.data,
                        paymentId: result.paymentId,
                        paymentTransactionId: result.itemTransactions?.[0]?.paymentTransactionId,
                        fraudStatus: result.fraudStatus,
                        //Bu eklendi
                        //Kaç para çektiği
                        paidPrice: result.paidPrice,
                        //Kaç taksit yaptığı
                        installment: result.installment,
                    },
                    status: "captured",
                });
            });
        });
    }
    async capturePayment(input) {
        return { data: input.data };
    }
    async cancelPayment(input) {
        const paymentId = input.data?.paymentId;
        return new Promise((resolve) => {
            this.client_.cancel.create({
                locale: Iyzipay.LOCALE.TR,
                paymentId,
                ip: "127.0.0.1",
            }, (err, result) => {
                if (err || result.status !== "success") {
                    resolve({ data: input.data });
                    return;
                }
                resolve({ data: { ...input.data, canceled: true } });
            });
        });
    }
    async deletePayment(input) {
        return this.cancelPayment(input);
    }
    async refundPayment(input) {
        const { data, amount } = input;
        const paymentId = data?.paymentId;
        let paymentTransactionId = data?.paymentTransactionId;
        if (!paymentTransactionId && paymentId) {
            const payment = await new Promise((resolve, reject) => {
                this.client_.payment.retrieve({
                    locale: Iyzipay.LOCALE.TR,
                    conversationId: data?.conversationId ?? `refund_${paymentId}`,
                    paymentId,
                }, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
            if (payment.status !== "success") {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR, `iyzico ödeme bilgisi alınamadı: ${payment.errorMessage ?? "Bilinmeyen hata"}`);
            }
            paymentTransactionId = payment.itemTransactions?.[0]?.paymentTransactionId;
        }
        if (!paymentTransactionId) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR, `iyzico iade için paymentTransactionId bulunamadı (paymentId: ${paymentId ?? "yok"})`);
        }
        const result = await new Promise((resolve, reject) => {
            this.client_.refund.create({
                locale: Iyzipay.LOCALE.TR,
                paymentTransactionId,
                price: this.toIyzicoAmount(amount),
                ip: "127.0.0.1",
            }, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(response);
            });
        });
        if (result.status !== "success") {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.PAYMENT_REQUIRES_MORE_ERROR, `iyzico iade başarısız: ${result.errorCode ?? "Bilinmeyen hata"} - ${result.errorMessage ?? "Bilinmeyen hata"}`);
        }
        return {
            data: {
                ...data,
                paymentTransactionId,
                refunded: true,
            },
        };
    }
    async retrievePayment(input) {
        return { data: input.data };
    }
    async updatePayment(input) {
        return this.initiatePayment(input);
    }
    async getPaymentStatus(input) {
        const status = input.data?.paymentId ? "authorized" : "pending";
        return { status };
    }
    async getWebhookActionAndData(payload) {
        return {
            action: "not_supported",
        };
    }
    toIyzicoAmount(amount) {
        const numericValue = typeof amount === "object" && amount !== null && "value" in amount
            ? Number(amount.value)
            : Number(amount);
        return numericValue.toFixed(2);
    }
    mapCurrency(code) {
        const map = {
            try: Iyzipay.CURRENCY.TRY,
            usd: Iyzipay.CURRENCY.USD,
            eur: Iyzipay.CURRENCY.EUR,
        };
        return map[(code || "try").toLowerCase()] || Iyzipay.CURRENCY.TRY;
    }
    mapAddress(address) {
        return {
            contactName: address
                ? `${address.first_name || ""} ${address.last_name || ""}`.trim()
                : "Musteri",
            city: address?.city || "Istanbul",
            country: address?.country_code || "Turkey",
            address: address?.address_1 || "Adres belirtilmedi",
            zipCode: address?.postal_code || "00000",
        };
    }
}
IyzicoPaymentProviderService.identifier = "iyzico";
exports.default = IyzicoPaymentProviderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BheW1lbnQtaXl6aWNvL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFHa0M7QUFHbEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWxDLHFDQUFxQztBQUNyQyxTQUFTLFdBQVcsQ0FBQyxFQUFVO0lBQzdCLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFdEQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvQyxJQUFJLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFB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
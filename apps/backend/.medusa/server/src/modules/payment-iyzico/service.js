"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const Iyzipay = require("iyzipay");
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
                identityNumber: "11111111111",
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
        return new Promise((resolve) => {
            this.client_.checkoutFormInitialize.create(request, (err, result) => {
                console.log("IYZICO RESULT:", JSON.stringify(result));
                if (err) {
                    console.log("IYZICO ERROR:", JSON.stringify(err));
                }
                if (err || result.status !== "success") {
                    resolve({
                        id: conversationId,
                        data: {
                            error: err?.message || result?.errorMessage || "iyzico baslatma hatasi",
                        },
                    });
                    return;
                }
                resolve({
                    id: conversationId,
                    data: {
                        token: result.token,
                        checkoutFormContent: result.checkoutFormContent,
                        paymentPageUrl: result.paymentPageUrl,
                        conversationId,
                    },
                });
            });
        });
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
            paymentTransactionId = payment.itemTransactions?.[0]?.paymentTransactionId;
        }
        if (!paymentTransactionId) {
            throw new Error(`iyzico iade için paymentTransactionId bulunamadı (paymentId: ${paymentId ?? "yok"})`);
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
            throw new Error(`iyzico iade başarısız: ${result.errorCode ?? "Bilinmeyen hata"} - ${result.errorMessage ?? "Bilinmeyen hata"}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BheW1lbnQtaXl6aWNvL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBbUU7QUFHbkUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWxDLE1BQU0sNEJBQTZCLFNBQVEsK0JBQXNDO0lBTS9FLFlBQVksU0FBYyxFQUFFLE9BQXNCO1FBQ2hELEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUE7UUFFdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQztZQUN6QixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDdkIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQzdCLEdBQUcsRUFBRSxPQUFPLENBQUMsUUFBUTtTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFVO1FBQzlCLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQTtRQUNoRCxNQUFNLFFBQVEsR0FBRyxPQUFPLEVBQUUsUUFBUSxDQUFBO1FBRWxDLE1BQU0sY0FBYyxHQUFHLFFBQVEsT0FBTyxFQUFFLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQTtRQUVuRSxNQUFNLE9BQU8sR0FBRztZQUNkLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsY0FBYztZQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUNsQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMs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
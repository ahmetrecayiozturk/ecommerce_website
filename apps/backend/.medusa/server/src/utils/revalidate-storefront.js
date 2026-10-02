"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateStorefrontOrders = revalidateStorefrontOrders;
// Storefront'un sipariş önbelleğini temizlemek için çağrılır.
// Hata olursa (storefront kapalıysa vb.) sessizce loglar, admin işlemini bozmaz.
async function revalidateStorefrontOrders() {
    const storefrontUrl = process.env.STOREFRONT_URL;
    const secret = process.env.REVALIDATE_SECRET;
    if (!storefrontUrl || !secret) {
        return;
    }
    try {
        await fetch(`${storefrontUrl}/api/revalidate?secret=${secret}&tag=orders`, { method: "POST" });
    }
    catch (err) {
        console.log("Storefront revalidate çağrısı başarısız oldu:", err);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2YWxpZGF0ZS1zdG9yZWZyb250LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3JldmFsaWRhdGUtc3RvcmVmcm9udC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQWdCQztBQWxCRCw4REFBOEQ7QUFDOUQsaUZBQWlGO0FBQzFFLEtBQUssVUFBVSwwQkFBMEI7SUFDOUMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7SUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQTtJQUU1QyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsT0FBTTtJQUNSLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxNQUFNLEtBQUssQ0FDVCxHQUFHLGFBQWEsMEJBQTBCLE1BQU0sYUFBYSxFQUM3RCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FDbkIsQ0FBQTtJQUNILENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0FBQ0gsQ0FBQyJ9
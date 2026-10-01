"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
// iyzico, Checkout Form ödemesi tamamlandığında bu adrese
// application/x-www-form-urlencoded POST isteği ile "token" gönderir.
// Biz bu token'ı storefront'un ödeme sonucu sayfasına query param
// olarak iletip yönlendiriyoruz. Storefront orada
// cart'ı "complete" ederek (authorizePayment tetiklenir) siparişi tamamlar.
async function POST(req, res) {
    const token = req.body?.token;
    const storefrontUrl = process.env.STOREFRONT_URL || "http://localhost:8000";
    if (!token) {
        res.redirect(`${storefrontUrl}/checkout?error=missing_token`);
        return;
    }
    res.redirect(`${storefrontUrl}/tr/checkout/iyzico-result?token=${token}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2l5emljby9jYWxsYmFjay9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLG9CQWVDO0FBcEJELDBEQUEwRDtBQUMxRCxzRUFBc0U7QUFDdEUsa0VBQWtFO0FBQ2xFLGtEQUFrRDtBQUNsRCw0RUFBNEU7QUFDckUsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBa0IsRUFDbEIsR0FBbUI7SUFFbkIsTUFBTSxLQUFLLEdBQUksR0FBRyxDQUFDLElBQVksRUFBRSxLQUFLLENBQUE7SUFFdEMsTUFBTSxhQUFhLEdBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLHVCQUF1QixDQUFBO0lBRXZELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxhQUFhLCtCQUErQixDQUFDLENBQUE7UUFDN0QsT0FBTTtJQUNSLENBQUM7SUFFRCxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsYUFBYSxvQ0FBb0MsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUMzRSxDQUFDIn0=
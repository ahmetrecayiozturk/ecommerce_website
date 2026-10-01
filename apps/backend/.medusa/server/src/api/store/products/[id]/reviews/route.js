"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const reviews_1 = require("../../../../../modules/reviews");
// GET /store/products/:id/reviews  -> onaylanmış yorumları + ortalama puanı döner
async function GET(req, res) {
    const reviewModuleService = req.scope.resolve(reviews_1.REVIEW_MODULE);
    const productId = req.params.id;
    const reviews = await reviewModuleService.listReviews({ product_id: productId, status: "approved" }, { order: { created_at: "DESC" } });
    const summary = await reviewModuleService.getProductRatingSummary(productId);
    res.json({ reviews, summary });
}
// POST /store/products/:id/reviews -> yeni yorum oluşturur (durumu "pending" olur,
// admin panelden onaylanana kadar mağazada görünmez)
async function POST(req, res) {
    const reviewModuleService = req.scope.resolve(reviews_1.REVIEW_MODULE);
    const productId = req.params.id;
    const { customer_name, rating, title, content, order_id } = req.body;
    if (!customer_name || !content || !rating) {
        res.status(400).json({
            message: "customer_name, rating ve content alanları zorunludur.",
        });
        return;
    }
    if (rating < 1 || rating > 5) {
        res.status(400).json({ message: "rating 1 ile 5 arasında olmalıdır." });
        return;
    }
    // req.auth_context varsa (müşteri giriş yapmışsa) customer_id otomatik alınır
    const customerId = req.auth_context?.actor_id ?? null;
    const review = await reviewModuleService.createReviews({
        product_id: productId,
        customer_id: customerId,
        customer_name,
        rating,
        title,
        content,
        order_id,
        status: "pending",
    });
    res.status(201).json({ review });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Byb2R1Y3RzL1tpZF0vcmV2aWV3cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGtCQWtCQztBQVlELG9CQXFDQztBQXZFRCw0REFBOEQ7QUFHOUQsa0ZBQWtGO0FBQzNFLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sbUJBQW1CLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNoRSx1QkFBYSxDQUNkLENBQUE7SUFDRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUUvQixNQUFNLE9BQU8sR0FBRyxNQUFNLG1CQUFtQixDQUFDLFdBQVcsQ0FDbkQsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFDN0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDbEMsQ0FBQTtJQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sbUJBQW1CLENBQUMsdUJBQXVCLENBQy9ELFNBQVMsQ0FDVixDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLENBQUM7QUFVRCxtRkFBbUY7QUFDbkYscURBQXFEO0FBQzlDLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQW9DLEVBQ3BDLEdBQW1CO0lBRW5CLE1BQU0sbUJBQW1CLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNoRSx1QkFBYSxDQUNkLENBQUE7SUFDRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUMvQixNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFcEUsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSx1REFBdUQ7U0FDakUsQ0FBQyxDQUFBO1FBQ0YsT0FBTTtJQUNSLENBQUM7SUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLENBQUMsQ0FBQTtRQUN2RSxPQUFNO0lBQ1IsQ0FBQztJQUVELDhFQUE4RTtJQUM5RSxNQUFNLFVBQVUsR0FBSSxHQUFXLENBQUMsWUFBWSxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUE7SUFFOUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDckQsVUFBVSxFQUFFLFNBQVM7UUFDckIsV0FBVyxFQUFFLFVBQVU7UUFDdkIsYUFBYTtRQUNiLE1BQU07UUFDTixLQUFLO1FBQ0wsT0FBTztRQUNQLFFBQVE7UUFDUixNQUFNLEVBQUUsU0FBUztLQUNsQixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDbEMsQ0FBQyJ9
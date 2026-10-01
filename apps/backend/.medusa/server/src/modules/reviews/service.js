"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const review_1 = __importDefault(require("./models/review"));
// MedusaService, Review modeli için otomatik olarak
// create/list/update/delete/retrieve metodlarını üretir:
// createReviews, listReviews, updateReviews, deleteReviews, retrieveReview ...
class ReviewModuleService extends (0, utils_1.MedusaService)({
    Review: review_1.default,
}) {
    // Bir ürünün ortalama puanını ve toplam yorum sayısını hesaplar
    async getProductRatingSummary(productId) {
        const reviews = await this.listReviews({
            product_id: productId,
            status: "approved",
        });
        const count = reviews.length;
        const average = count === 0
            ? 0
            : Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10;
        return { average, count };
    }
}
exports.default = ReviewModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Jldmlld3Mvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUF5RDtBQUN6RCw2REFBb0M7QUFFcEMsb0RBQW9EO0FBQ3BELHlEQUF5RDtBQUN6RCwrRUFBK0U7QUFDL0UsTUFBTSxtQkFBb0IsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDOUMsTUFBTSxFQUFOLGdCQUFNO0NBQ1AsQ0FBQztJQUNBLGdFQUFnRTtJQUNoRSxLQUFLLENBQUMsdUJBQXVCLENBQUMsU0FBaUI7UUFDN0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3JDLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLE1BQU0sRUFBRSxVQUFVO1NBQ25CLENBQUMsQ0FBQTtRQUVGLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUE7UUFDNUIsTUFBTSxPQUFPLEdBQ1gsS0FBSyxLQUFLLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztZQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNSLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FDN0QsR0FBRyxFQUFFLENBQUE7UUFFWixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFBO0lBQzNCLENBQUM7Q0FDRjtBQUVELGtCQUFlLG1CQUFtQixDQUFBIn0=
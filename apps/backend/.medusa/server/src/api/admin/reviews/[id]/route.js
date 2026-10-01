"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.DELETE = DELETE;
const reviews_1 = require("../../../../modules/reviews");
// POST /admin/reviews/:id -> durumunu günceller (onayla / reddet)
async function POST(req, res) {
    const reviewModuleService = req.scope.resolve(reviews_1.REVIEW_MODULE);
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected", "pending"].includes(status)) {
        res.status(400).json({ message: "Geçersiz status değeri." });
        return;
    }
    const review = await reviewModuleService.updateReviews({
        id,
        status,
    });
    res.json({ review });
}
// DELETE /admin/reviews/:id -> yorumu tamamen siler
async function DELETE(req, res) {
    const reviewModuleService = req.scope.resolve(reviews_1.REVIEW_MODULE);
    const { id } = req.params;
    await reviewModuleService.deleteReviews([id]);
    res.json({ id, object: "review", deleted: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3Jldmlld3MvW2lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBLG9CQXFCQztBQUdELHdCQVlDO0FBNUNELHlEQUEyRDtBQU8zRCxrRUFBa0U7QUFDM0QsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBb0MsRUFDcEMsR0FBbUI7SUFFbkIsTUFBTSxtQkFBbUIsR0FBd0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ2hFLHVCQUFhLENBQ2QsQ0FBQTtJQUNELE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRTNCLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFBO1FBQzVELE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDckQsRUFBRTtRQUNGLE1BQU07S0FDUCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUN0QixDQUFDO0FBRUQsb0RBQW9EO0FBQzdDLEtBQUssVUFBVSxNQUFNLENBQzFCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sbUJBQW1CLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNoRSx1QkFBYSxDQUNkLENBQUE7SUFDRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUV6QixNQUFNLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ25ELENBQUMifQ==
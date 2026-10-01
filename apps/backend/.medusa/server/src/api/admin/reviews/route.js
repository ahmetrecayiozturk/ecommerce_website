"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const reviews_1 = require("../../../modules/reviews");
// GET /admin/reviews?status=pending -> admin panelde moderasyon listesi
async function GET(req, res) {
    const reviewModuleService = req.scope.resolve(reviews_1.REVIEW_MODULE);
    const status = req.query.status;
    const filters = status ? { status } : {};
    const reviews = await reviewModuleService.listReviews(filters, {
        order: { created_at: "DESC" },
    });
    res.json({ reviews, count: reviews.length });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3Jldmlld3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxrQkFnQkM7QUFwQkQsc0RBQXdEO0FBR3hELHdFQUF3RTtBQUNqRSxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLG1CQUFtQixHQUF3QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDaEUsdUJBQWEsQ0FDZCxDQUFBO0lBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUE0QixDQUFBO0lBRXJELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRXhDLE1BQU0sT0FBTyxHQUFHLE1BQU0sbUJBQW1CLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUM3RCxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0tBQzlCLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQzlDLENBQUMifQ==
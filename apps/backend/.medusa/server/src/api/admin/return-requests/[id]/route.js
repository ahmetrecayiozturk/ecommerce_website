"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const return_requests_1 = require("../../../../modules/return-requests");
const revalidate_storefront_1 = require("../../../../utils/revalidate-storefront");
// POST /admin/return-requests/:id -> durumunu günceller (onayla / reddet / iade edildi olarak işaretle)
async function POST(req, res) {
    const service = req.scope.resolve(return_requests_1.RETURN_REQUEST_MODULE);
    const { id } = req.params;
    const { status, admin_note } = req.body;
    if (!["approved", "rejected", "refunded"].includes(status)) {
        res.status(400).json({ message: "Geçersiz status değeri." });
        return;
    }
    const request = await service.updateReturnRequests({
        id,
        status: status,
        admin_note,
    });
    await (0, revalidate_storefront_1.revalidateStorefrontOrders)();
    res.json({ return_request: request });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JldHVybi1yZXF1ZXN0cy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBY0Esb0JBd0JDO0FBbENELHlFQUEyRTtBQUUzRSxtRkFBb0Y7QUFPcEYsd0dBQXdHO0FBQ2pHLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTJDLEVBQzNDLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUN6QixNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFdkMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMzRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUE7UUFDNUQsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUNqRCxFQUFFO1FBQ0YsTUFBTSxFQUFFLE1BQWE7UUFDckIsVUFBVTtLQUNKLENBQUMsQ0FBQTtJQUVULE1BQU0sSUFBQSxrREFBMEIsR0FBRSxDQUFBO0lBRWxDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUN2QyxDQUFDIn0=
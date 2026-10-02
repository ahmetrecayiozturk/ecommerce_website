"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const return_requests_1 = require("../../../../../modules/return-requests");
const utils_1 = require("@medusajs/framework/utils");
// GET /store/orders/:id/return-requests -> müşteri kendi iade taleplerinin durumunu görür
async function GET(req, res) {
    const service = req.scope.resolve(return_requests_1.RETURN_REQUEST_MODULE);
    const orderId = req.params.id;
    const requests = await service.listReturnRequests({ order_id: orderId, type: "return" }, { order: { created_at: "DESC" } });
    res.json({ return_requests: requests });
}
// POST /store/orders/:id/return-requests -> yeni iade talebi oluşturur (pending)
async function POST(req, res) {
    const service = req.scope.resolve(return_requests_1.RETURN_REQUEST_MODULE);
    const orderId = req.params.id;
    const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
    const order = await orderModuleService.retrieveOrder(orderId);
    const items = order.items ?? [];
    const isFullyDelivered = items.length > 0 &&
        items.every((item) => {
            const detail = item.detail ?? {};
            const quantity = Number(detail.quantity ?? 0);
            const deliveredQuantity = Number(detail.delivered_quantity ?? 0);
            return deliveredQuantity >= quantity;
        });
    if (!isFullyDelivered) {
        res.status(400).json({
            message: "İade talebi yalnızca teslim edilmiş siparişler için oluşturulabilir.",
        });
        return;
    }
    const { order_display_id, customer_email, customer_name, item_description, reason, } = req.body;
    if (!customer_email || !customer_name || !item_description || !reason) {
        res.status(400).json({
            message: "customer_email, customer_name, item_description ve reason zorunludur.",
        });
        return;
    }
    const request = await service.createReturnRequests({
        order_id: orderId,
        order_display_id,
        customer_email,
        customer_name,
        item_description,
        reason,
        status: "pending",
    });
    res.status(201).json({ return_request: request });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL29yZGVycy9baWRdL3JldHVybi1yZXF1ZXN0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGtCQWVDO0FBV0Qsb0JBeURDO0FBdkZELDRFQUE4RTtBQUU5RSxxREFBbUQ7QUFDbkQsMEZBQTBGO0FBQ25GLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUU3QixNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxrQkFBa0IsQ0FDL0MsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQVMsRUFDNUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDbEMsQ0FBQTtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN6QyxDQUFDO0FBVUQsaUZBQWlGO0FBQzFFLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTJDLEVBQzNDLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUU3QixNQUFNLGtCQUFrQixHQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxNQUFNLEtBQUssR0FBRyxNQUFNLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUU3RCxNQUFNLEtBQUssR0FBSSxLQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUN4QyxNQUFNLGdCQUFnQixHQUNwQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDaEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFBO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzdDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNoRSxPQUFPLGlCQUFpQixJQUFJLFFBQVEsQ0FBQTtRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUVKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFDTCxzRUFBc0U7U0FDekUsQ0FBQyxDQUFBO1FBQ0YsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLEVBQ0osZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLE1BQU0sR0FDUCxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFWixJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQ0wsdUVBQXVFO1NBQzFFLENBQUMsQ0FBQTtRQUNGLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDakQsUUFBUSxFQUFFLE9BQU87UUFDakIsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLE1BQU07UUFDTixNQUFNLEVBQUUsU0FBUztLQUNsQixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ25ELENBQUMifQ==
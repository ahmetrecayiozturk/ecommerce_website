"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const return_requests_1 = require("../../../../../modules/return-requests");
// GET /store/orders/:id/cancellation-requests -> müşterinin iptal talebi durumu
async function GET(req, res) {
    const service = req.scope.resolve(return_requests_1.RETURN_REQUEST_MODULE);
    const orderId = req.params.id;
    const requests = await service.listReturnRequests({ order_id: orderId, type: "cancellation" }, { order: { created_at: "DESC" } });
    res.json({ cancellation_requests: requests });
}
// POST /store/orders/:id/cancellation-requests -> yeni iptal talebi
// (yalnızca henüz kargoya verilmemiş/fulfill edilmemiş siparişler için)
async function POST(req, res) {
    const service = req.scope.resolve(return_requests_1.RETURN_REQUEST_MODULE);
    const orderId = req.params.id;
    const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
    const order = await orderModuleService.retrieveOrder(orderId);
    const items = order.items ?? [];
    const hasAnyFulfillment = items.some((item) => {
        const detail = item.detail ?? {};
        const fulfilledQuantity = Number(detail.fulfilled_quantity ?? 0);
        return fulfilledQuantity > 0;
    });
    if (hasAnyFulfillment) {
        res.status(400).json({
            message: "Bu sipariş kargoya verilmiş, artık iptal talebi oluşturulamaz. İade talebi oluşturabilirsiniz.",
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
        type: "cancellation",
        customer_email,
        customer_name,
        item_description,
        reason,
        status: "pending",
    });
    res.status(201).json({ cancellation_request: request });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL29yZGVycy9baWRdL2NhbmNlbGxhdGlvbi1yZXF1ZXN0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBLGtCQWVDO0FBWUQsb0JBdURDO0FBdkZELHFEQUFtRDtBQUNuRCw0RUFBOEU7QUFHOUUsZ0ZBQWdGO0FBQ3pFLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUU3QixNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxrQkFBa0IsQ0FDL0MsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQVMsRUFDbEQsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDbEMsQ0FBQTtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQy9DLENBQUM7QUFVRCxvRUFBb0U7QUFDcEUsd0VBQXdFO0FBQ2pFLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTBDLEVBQzFDLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUU3QixNQUFNLGtCQUFrQixHQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxNQUFNLEtBQUssR0FBRyxNQUFNLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUU3RCxNQUFNLEtBQUssR0FBSSxLQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUN4QyxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtRQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQTtRQUNoQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDaEUsT0FBTyxpQkFBaUIsR0FBRyxDQUFDLENBQUE7SUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUNMLGdHQUFnRztTQUNuRyxDQUFDLENBQUE7UUFDRixPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sRUFDSixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUVaLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFDTCx1RUFBdUU7U0FDMUUsQ0FBQyxDQUFBO1FBQ0YsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUNqRCxRQUFRLEVBQUUsT0FBTztRQUNqQixnQkFBZ0I7UUFDaEIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsTUFBTTtRQUNOLE1BQU0sRUFBRSxTQUFTO0tBQ1gsQ0FBQyxDQUFBO0lBRVQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3pELENBQUMifQ==
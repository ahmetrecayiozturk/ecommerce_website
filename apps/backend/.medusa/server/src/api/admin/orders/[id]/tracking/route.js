"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const shipment_tracking_1 = require("../../../../../modules/shipment-tracking");
async function GET(req, res) {
    const service = req.scope.resolve(shipment_tracking_1.SHIPMENT_TRACKING_MODULE);
    const orderId = req.params.id;
    const trackings = await service.listShipmentTrackings({ order_id: orderId }, { order: { created_at: "DESC" } });
    res.json({ trackings });
}
async function POST(req, res) {
    const service = req.scope.resolve(shipment_tracking_1.SHIPMENT_TRACKING_MODULE);
    const orderId = req.params.id;
    const { fulfillment_id, carrier, carrier_name, tracking_number } = req.body;
    if (!carrier || !tracking_number) {
        res
            .status(400)
            .json({ message: "carrier ve tracking_number zorunludur." });
        return;
    }
    const tracking_url = await service.buildTrackingUrl(carrier, tracking_number);
    const tracking = await service.createShipmentTrackings({
        order_id: orderId,
        fulfillment_id,
        carrier: carrier,
        carrier_name,
        tracking_number,
        tracking_url,
        status: "shipped",
        status_history: [
            {
                status: "shipped",
                note: "Kargoya verildi",
                created_at: new Date().toISOString(),
            },
        ],
    });
    res.status(201).json({ tracking });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL29yZGVycy9baWRdL3RyYWNraW5nL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0Esa0JBZUM7QUFTRCxvQkFxQ0M7QUFsRUQsZ0ZBRWlEO0FBRzFDLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUFrQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDOUQsNENBQXdCLENBQ3pCLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUU3QixNQUFNLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxxQkFBcUIsQ0FDbkQsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQ3JCLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQ2xDLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUN6QixDQUFDO0FBU00sS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBc0MsRUFDdEMsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQWtDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM5RCw0Q0FBd0IsQ0FDekIsQ0FBQTtJQUNELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQzdCLE1BQU0sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRTNFLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNqQyxHQUFHO2FBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxDQUFDLENBQUE7UUFDOUQsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFFN0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsdUJBQXVCLENBQUM7UUFDckQsUUFBUSxFQUFFLE9BQU87UUFDakIsY0FBYztRQUNkLE9BQU8sRUFBRSxPQUFjO1FBQ3ZCLFlBQVk7UUFDWixlQUFlO1FBQ2YsWUFBWTtRQUNaLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLGNBQWMsRUFBRTtZQUNkO2dCQUNFLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7YUFDckM7U0FDSztLQUNGLENBQUMsQ0FBQTtJQUVULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNwQyxDQUFDIn0=
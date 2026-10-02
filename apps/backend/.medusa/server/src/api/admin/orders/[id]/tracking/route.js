"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const shipment_tracking_1 = require("../../../../../modules/shipment-tracking");
const revalidate_storefront_1 = require("../../../../../utils/revalidate-storefront");
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
    await (0, revalidate_storefront_1.revalidateStorefrontOrders)();
    res.status(201).json({ tracking });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL29yZGVycy9baWRdL3RyYWNraW5nL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsa0JBZUM7QUFTRCxvQkFzQ0M7QUFwRUQsZ0ZBRWlEO0FBRWpELHNGQUF1RjtBQUVoRixLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLE9BQU8sR0FBa0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzlELDRDQUF3QixDQUN6QixDQUFBO0lBQ0QsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFFN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMscUJBQXFCLENBQ25ELEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUNyQixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUNsQyxDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7QUFDekIsQ0FBQztBQVNNLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQXNDLEVBQ3RDLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUFrQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDOUQsNENBQXdCLENBQ3pCLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUM3QixNQUFNLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUUzRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDakMsR0FBRzthQUNBLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQyxDQUFBO1FBQzlELE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRTdFLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLHVCQUF1QixDQUFDO1FBQ3JELFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGNBQWM7UUFDZCxPQUFPLEVBQUUsT0FBYztRQUN2QixZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVk7UUFDWixNQUFNLEVBQUUsU0FBUztRQUNqQixjQUFjLEVBQUU7WUFDZDtnQkFDRSxNQUFNLEVBQUUsU0FBUztnQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO2FBQ3JDO1NBQ0s7S0FDRixDQUFDLENBQUE7SUFDVCxNQUFNLElBQUEsa0RBQTBCLEdBQUUsQ0FBQTtJQUVsQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDcEMsQ0FBQyJ9
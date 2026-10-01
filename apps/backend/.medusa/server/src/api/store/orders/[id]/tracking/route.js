"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const shipment_tracking_1 = require("../../../../../modules/shipment-tracking");
// GET /store/orders/:id/tracking -> müşterinin sipariş takip sayfasında
// kullanacağı kargo bilgisi (carrier, tracking_number, tracking_url,
// güncel durum ve durum geçmişi)
async function GET(req, res) {
    const service = req.scope.resolve(shipment_tracking_1.SHIPMENT_TRACKING_MODULE);
    const orderId = req.params.id;
    const trackings = await service.listShipmentTrackings({ order_id: orderId }, { order: { created_at: "DESC" } });
    if (!trackings.length) {
        res.json({ trackings: [], message: "Bu sipariş için henüz kargo bilgisi girilmedi." });
        return;
    }
    res.json({ trackings });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL29yZGVycy9baWRdL3RyYWNraW5nL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsa0JBb0JDO0FBNUJELGdGQUVpRDtBQUdqRCx3RUFBd0U7QUFDeEUscUVBQXFFO0FBQ3JFLGlDQUFpQztBQUMxQixLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLE9BQU8sR0FBa0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzlELDRDQUF3QixDQUN6QixDQUFBO0lBQ0QsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFFN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMscUJBQXFCLENBQ25ELEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUNyQixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUNsQyxDQUFBO0lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsZ0RBQWdELEVBQUUsQ0FBQyxDQUFBO1FBQ3RGLE9BQU07SUFDUixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7QUFDekIsQ0FBQyJ9
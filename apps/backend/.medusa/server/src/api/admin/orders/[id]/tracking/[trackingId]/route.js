"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const shipment_tracking_1 = require("../../../../../../modules/shipment-tracking");
// POST /admin/orders/:id/tracking/:trackingId -> durum günceller,
// geçmişe yeni bir kayıt ekler (örn. "Dağıtıma çıktı")
async function POST(req, res) {
    const service = req.scope.resolve(shipment_tracking_1.SHIPMENT_TRACKING_MODULE);
    const { trackingId } = req.params;
    const { status, note } = req.body;
    const tracking = await service.addStatusUpdate(trackingId, status, note);
    res.json({ tracking });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL29yZGVycy9baWRdL3RyYWNraW5nL1t0cmFja2luZ0lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXNCQSxvQkFhQztBQS9CRCxtRkFFb0Q7QUFjcEQsa0VBQWtFO0FBQ2xFLHVEQUF1RDtBQUNoRCxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUFvQyxFQUNwQyxHQUFtQjtJQUVuQixNQUFNLE9BQU8sR0FBa0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzlELDRDQUF3QixDQUN6QixDQUFBO0lBQ0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDakMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRWpDLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBRXhFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3hCLENBQUMifQ==
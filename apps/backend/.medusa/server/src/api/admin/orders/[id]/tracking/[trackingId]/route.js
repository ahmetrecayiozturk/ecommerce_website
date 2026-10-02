"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const shipment_tracking_1 = require("../../../../../../modules/shipment-tracking");
const revalidate_storefront_1 = require("../../../../../../utils/revalidate-storefront");
// POST /admin/orders/:id/tracking/:trackingId -> durum günceller,
// geçmişe yeni bir kayıt ekler (örn. "Dağıtıma çıktı")
async function POST(req, res) {
    const service = req.scope.resolve(shipment_tracking_1.SHIPMENT_TRACKING_MODULE);
    const { trackingId } = req.params;
    const { status, note } = req.body;
    const tracking = await service.addStatusUpdate(trackingId, status, note);
    await (0, revalidate_storefront_1.revalidateStorefrontOrders)();
    res.json({ tracking });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL29yZGVycy9baWRdL3RyYWNraW5nL1t0cmFja2luZ0lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXVCQSxvQkFlQztBQWxDRCxtRkFFb0Q7QUFFcEQseUZBQTBGO0FBYTFGLGtFQUFrRTtBQUNsRSx1REFBdUQ7QUFDaEQsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBb0MsRUFDcEMsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQWtDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM5RCw0Q0FBd0IsQ0FDekIsQ0FBQTtJQUNELE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ2pDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUVqQyxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUV4RSxNQUFNLElBQUEsa0RBQTBCLEdBQUUsQ0FBQTtJQUVsQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN4QixDQUFDIn0=
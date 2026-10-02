"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const return_requests_1 = require("../../../../../modules/return-requests");
const revalidate_storefront_1 = require("../../../../../utils/revalidate-storefront");
// POST /admin/return-requests/:id/shipping-code
// -> admin, kargo firmasının portalından aldığı iade kodunu girer
async function POST(req, res) {
    const service = req.scope.resolve(return_requests_1.RETURN_REQUEST_MODULE);
    const { id } = req.params;
    const { return_carrier, return_code, return_instructions } = req.body;
    if (!return_carrier || !return_code) {
        res.status(400).json({
            message: "return_carrier ve return_code zorunludur.",
        });
        return;
    }
    const request = await service.updateReturnRequests({
        id,
        return_carrier: return_carrier,
        return_code,
        return_instructions,
    });
    await (0, revalidate_storefront_1.revalidateStorefrontOrders)();
    res.json({ return_request: request });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JldHVybi1yZXF1ZXN0cy9baWRdL3NoaXBwaW5nLWNvZGUvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQkEsb0JBMkJDO0FBdkNELDRFQUE4RTtBQUU5RSxzRkFBdUY7QUFRdkYsZ0RBQWdEO0FBQ2hELGtFQUFrRTtBQUMzRCxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUF1QyxFQUN2QyxHQUFtQjtJQUVuQixNQUFNLE9BQU8sR0FBK0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzNELHVDQUFxQixDQUN0QixDQUFBO0lBQ0QsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDekIsTUFBTSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRXJFLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQUUsMkNBQTJDO1NBQ3JELENBQUMsQ0FBQTtRQUNGLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDakQsRUFBRTtRQUNGLGNBQWMsRUFBRSxjQUFxQjtRQUNyQyxXQUFXO1FBQ1gsbUJBQW1CO0tBQ2IsQ0FBQyxDQUFBO0lBRVQsTUFBTSxJQUFBLGtEQUEwQixHQUFFLENBQUE7SUFFbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMifQ==
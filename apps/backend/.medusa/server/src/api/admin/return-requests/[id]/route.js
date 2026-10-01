"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const return_requests_1 = require("../../../../modules/return-requests");
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
    res.json({ return_request: request });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JldHVybi1yZXF1ZXN0cy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBYUEsb0JBc0JDO0FBL0JELHlFQUEyRTtBQVEzRSx3R0FBd0c7QUFDakcsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBMkMsRUFDM0MsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQStCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMzRCx1Q0FBcUIsQ0FDdEIsQ0FBQTtJQUNELE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUV2QyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQTtRQUM1RCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQ2pELEVBQUU7UUFDRixNQUFNLEVBQUUsTUFBYTtRQUNyQixVQUFVO0tBQ0osQ0FBQyxDQUFBO0lBRVQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMifQ==
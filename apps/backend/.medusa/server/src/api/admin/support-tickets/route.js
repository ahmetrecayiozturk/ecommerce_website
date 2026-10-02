"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const support_tickets_1 = require("../../../modules/support-tickets");
// GET /admin/support-tickets?status=open -> tüm destek taleplerini listeler
async function GET(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const status = req.query.status;
    const filters = status ? { status } : {};
    const tickets = await service.listSupportTickets(filters, {
        order: { created_at: "DESC" },
    });
    res.json({ support_tickets: tickets, count: tickets.length });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N1cHBvcnQtdGlja2V0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGtCQWdCQztBQXBCRCxzRUFBd0U7QUFHeEUsNEVBQTRFO0FBQ3JFLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQTRCLENBQUE7SUFFckQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFeEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO1FBQ3hELEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7S0FDOUIsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQy9ELENBQUMifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const support_tickets_1 = require("../../../../modules/support-tickets");
// GET /admin/support-tickets/:id -> tek bir konuşmanın tüm mesajlarını getirir
async function GET(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const { id } = req.params;
    const ticket = await service.retrieveSupportTicket(id);
    res.json({ support_ticket: ticket });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N1cHBvcnQtdGlja2V0cy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsa0JBWUM7QUFoQkQseUVBQTJFO0FBRzNFLCtFQUErRTtBQUN4RSxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLE9BQU8sR0FBK0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzNELHVDQUFxQixDQUN0QixDQUFBO0lBQ0QsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFFekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ3RDLENBQUMifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const support_tickets_1 = require("../../../../../modules/support-tickets");
// POST /admin/support-tickets/:id/close -> talebi kapat/tekrar aç
async function POST(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const { id } = req.params;
    const { status } = req.body;
    if (!["open", "closed"].includes(status)) {
        res.status(400).json({ message: "Geçersiz status değeri." });
        return;
    }
    const ticket = await service.updateSupportTickets({
        id,
        status: status,
    });
    res.json({ support_ticket: ticket });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N1cHBvcnQtdGlja2V0cy9baWRdL2Nsb3NlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsb0JBcUJDO0FBN0JELDRFQUE4RTtBQU85RSxrRUFBa0U7QUFDM0QsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBb0MsRUFDcEMsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQStCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMzRCx1Q0FBcUIsQ0FDdEIsQ0FBQTtJQUNELE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRTNCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUE7UUFDNUQsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUNoRCxFQUFFO1FBQ0YsTUFBTSxFQUFFLE1BQWE7S0FDZixDQUFDLENBQUE7SUFFVCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDdEMsQ0FBQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const support_tickets_1 = require("../../../../../modules/support-tickets");
// POST /store/support-tickets/:id/messages -> müşteri konuşmaya cevap yazar
async function POST(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const { id } = req.params;
    const { message } = req.body;
    if (!message) {
        res.status(400).json({ message: "message zorunludur." });
        return;
    }
    const ticket = await service.addMessage(id, "customer", message);
    res.status(201).json({ support_ticket: ticket });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3N1cHBvcnQtdGlja2V0cy9baWRdL21lc3NhZ2VzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsb0JBa0JDO0FBMUJELDRFQUE4RTtBQU85RSw0RUFBNEU7QUFDckUsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBa0MsRUFDbEMsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQStCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMzRCx1Q0FBcUIsQ0FDdEIsQ0FBQTtJQUNELE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRTVCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUMsQ0FBQTtRQUN4RCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRWhFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDbEQsQ0FBQyJ9
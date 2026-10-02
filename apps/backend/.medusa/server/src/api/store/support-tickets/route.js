"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const support_tickets_1 = require("../../../modules/support-tickets");
// GET /store/support-tickets?email=... -> müşterinin kendi taleplerini listeler
async function GET(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const email = req.query.email;
    if (!email) {
        res.status(400).json({ message: "email parametresi zorunludur." });
        return;
    }
    const tickets = await service.listSupportTickets({ customer_email: email }, { order: { created_at: "DESC" } });
    res.json({ support_tickets: tickets });
}
// POST /store/support-tickets -> yeni destek talebi (konuşması) başlatır
async function POST(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const { order_id, order_display_id, customer_email, customer_name, subject, message, } = req.body;
    if (!customer_email || !customer_name || !subject || !message) {
        res.status(400).json({
            message: "customer_email, customer_name, subject ve message zorunludur.",
        });
        return;
    }
    const ticket = await service.createSupportTickets({
        order_id,
        order_display_id,
        customer_email,
        customer_name,
        subject,
        status: "open",
        messages: [
            {
                sender: "customer",
                message,
                created_at: new Date().toISOString(),
            },
        ],
    });
    res.status(201).json({ support_ticket: ticket });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3N1cHBvcnQtdGlja2V0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGtCQW9CQztBQVlELG9CQXlDQztBQTdFRCxzRUFBd0U7QUFHeEUsZ0ZBQWdGO0FBQ3pFLEtBQUssVUFBVSxHQUFHLENBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQTJCLENBQUE7SUFFbkQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsQ0FBQyxDQUFBO1FBQ2xFLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsa0JBQWtCLENBQzlDLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxFQUN6QixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUNsQyxDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3hDLENBQUM7QUFXRCx5RUFBeUU7QUFDbEUsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBb0MsRUFDcEMsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQStCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMzRCx1Q0FBcUIsQ0FDdEIsQ0FBQTtJQUNELE1BQU0sRUFDSixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsT0FBTyxFQUNQLE9BQU8sR0FDUixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFWixJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUNMLCtEQUErRDtTQUNsRSxDQUFDLENBQUE7UUFDRixPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQ2hELFFBQVE7UUFDUixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGFBQWE7UUFDYixPQUFPO1FBQ1AsTUFBTSxFQUFFLE1BQU07UUFDZCxRQUFRLEVBQUU7WUFDUjtnQkFDRSxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsT0FBTztnQkFDUCxVQUFVLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7YUFDckM7U0FDSztLQUNGLENBQUMsQ0FBQTtJQUVULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDbEQsQ0FBQyJ9
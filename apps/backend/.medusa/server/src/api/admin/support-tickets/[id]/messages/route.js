"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const support_tickets_1 = require("../../../../../modules/support-tickets");
const revalidate_storefront_1 = require("../../../../../utils/revalidate-storefront");
// POST /admin/support-tickets/:id/messages -> admin konuşmaya cevap yazar
async function POST(req, res) {
    const service = req.scope.resolve(support_tickets_1.SUPPORT_TICKET_MODULE);
    const { id } = req.params;
    const { message } = req.body;
    if (!message) {
        res.status(400).json({ message: "message zorunludur." });
        return;
    }
    const ticket = await service.addMessage(id, "admin", message);
    await (0, revalidate_storefront_1.revalidateStorefrontOrders)();
    res.status(201).json({ support_ticket: ticket });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N1cHBvcnQtdGlja2V0cy9baWRdL21lc3NhZ2VzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBYUEsb0JBb0JDO0FBN0JELDRFQUE4RTtBQUU5RSxzRkFBdUY7QUFNdkYsMEVBQTBFO0FBQ25FLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQWtDLEVBQ2xDLEdBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDM0QsdUNBQXFCLENBQ3RCLENBQUE7SUFDRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUN6QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUU1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUE7UUFDeEQsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUU3RCxNQUFNLElBQUEsa0RBQTBCLEdBQUUsQ0FBQTtJQUVsQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ2xELENBQUMifQ==
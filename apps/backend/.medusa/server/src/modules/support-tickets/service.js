"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const support_ticket_1 = __importDefault(require("./models/support-ticket"));
class SupportTicketModuleService extends (0, utils_1.MedusaService)({
    SupportTicket: support_ticket_1.default,
}) {
    async addMessage(id, sender, message) {
        const ticket = await this.retrieveSupportTicket(id);
        const messages = Array.isArray(ticket.messages) ? ticket.messages : [];
        messages.push({
            sender,
            message,
            created_at: new Date().toISOString(),
        });
        return this.updateSupportTickets({
            id,
            messages: messages,
            // Müşteri yazınca talep otomatik "open" kalsın/olsun;
            // admin yazınca durumu değiştirmiyoruz burada, ayrı endpoint var.
            status: sender === "customer" ? "open" : ticket.status,
        });
    }
}
exports.default = SupportTicketModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3N1cHBvcnQtdGlja2V0cy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQXlEO0FBQ3pELDZFQUFtRDtBQUVuRCxNQUFNLDBCQUEyQixTQUFRLElBQUEscUJBQWEsRUFBQztJQUNyRCxhQUFhLEVBQWIsd0JBQWE7Q0FDZCxDQUFDO0lBQ0EsS0FBSyxDQUFDLFVBQVUsQ0FDZCxFQUFVLEVBQ1YsTUFBNEIsRUFDNUIsT0FBZTtRQUVmLE1BQU0sTUFBTSxHQUFRLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3hELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFFdEUsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNaLE1BQU07WUFDTixPQUFPO1lBQ1AsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1NBQ3JDLENBQUMsQ0FBQTtRQUVGLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1lBQy9CLEVBQUU7WUFDRixRQUFRLEVBQUUsUUFBZTtZQUN6QixzREFBc0Q7WUFDdEQsa0VBQWtFO1lBQ2xFLE1BQU0sRUFBRSxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLE1BQU0sQ0FBQyxNQUFjO1NBQ3pELENBQUMsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQUVELGtCQUFlLDBCQUEwQixDQUFBIn0=
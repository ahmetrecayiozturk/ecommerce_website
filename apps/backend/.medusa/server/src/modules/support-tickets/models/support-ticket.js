"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const SupportTicket = utils_1.model.define("support_ticket", {
    id: utils_1.model.id().primaryKey(),
    order_id: utils_1.model.text().nullable(),
    order_display_id: utils_1.model.number().nullable(),
    customer_email: utils_1.model.text().index("IDX_support_ticket_customer_email"),
    customer_name: utils_1.model.text(),
    subject: utils_1.model.text(),
    status: utils_1.model.enum(["open", "closed"]).default("open"),
    // [{ sender: "customer" | "admin", message: string, created_at: string }]
    messages: utils_1.model.json().default([]),
});
exports.default = SupportTicket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcG9ydC10aWNrZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zdXBwb3J0LXRpY2tldHMvbW9kZWxzL3N1cHBvcnQtdGlja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWlEO0FBRWpELE1BQU0sYUFBYSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7SUFDbkQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakMsZ0JBQWdCLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMzQyxjQUFjLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQztJQUN2RSxhQUFhLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUMzQixPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNyQixNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDdEQsMEVBQTBFO0lBQzFFLFFBQVEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQVMsQ0FBQztDQUMxQyxDQUFDLENBQUE7QUFFRixrQkFBZSxhQUFhLENBQUEifQ==
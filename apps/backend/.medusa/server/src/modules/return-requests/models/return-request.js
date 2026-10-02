"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const ReturnRequest = utils_1.model.define("return_request", {
    id: utils_1.model.id().primaryKey(),
    order_id: utils_1.model.text().index("IDX_return_request_order_id"),
    order_display_id: utils_1.model.number().nullable(),
    type: utils_1.model.enum(["return", "cancellation"]).default("return"),
    customer_email: utils_1.model.text(),
    customer_name: utils_1.model.text(),
    item_description: utils_1.model.text(),
    reason: utils_1.model.text(),
    status: utils_1.model.enum(["pending", "approved", "rejected", "refunded"]).default("pending"),
    admin_note: utils_1.model.text().nullable(),
    // İade kargosu bilgileri — admin, kargo firmasının kendi
    // portalından elle oluşturduğu kodu buraya girer.
    return_carrier: utils_1.model.enum(["yurtici", "aras", "mng", "ptt", "surat", "ups", "other"]).nullable(),
    return_code: utils_1.model.text().nullable(),
    return_instructions: utils_1.model.text().nullable(),
});
exports.default = ReturnRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXR1cm4tcmVxdWVzdHMvbW9kZWxzL3JldHVybi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWlEO0FBRWpELE1BQU0sYUFBYSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7SUFDbkQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7SUFDM0QsZ0JBQWdCLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMzQyxJQUFJLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDOUQsY0FBYyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDNUIsYUFBYSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDM0IsZ0JBQWdCLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUM5QixNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNwQixNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUN0RixVQUFVLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQyx5REFBeUQ7SUFDekQsa0RBQWtEO0lBQ2xELGNBQWMsRUFBRSxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDakcsV0FBVyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDcEMsbUJBQW1CLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUM3QyxDQUFDLENBQUE7QUFFRixrQkFBZSxhQUFhLENBQUEifQ==
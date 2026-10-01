"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const ReturnRequest = utils_1.model.define("return_request", {
    id: utils_1.model.id().primaryKey(),
    order_id: utils_1.model.text().index("IDX_return_request_order_id"),
    order_display_id: utils_1.model.number().nullable(),
    customer_email: utils_1.model.text(),
    customer_name: utils_1.model.text(),
    item_description: utils_1.model.text(), // hangi ürün(ler) iade edilecek, müşterinin kendi yazdığı
    reason: utils_1.model.text(),
    status: utils_1.model.enum(["pending", "approved", "rejected", "refunded"]).default("pending"),
    admin_note: utils_1.model.text().nullable(),
});
exports.default = ReturnRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXR1cm4tcmVxdWVzdHMvbW9kZWxzL3JldHVybi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWlEO0FBRWpELE1BQU0sYUFBYSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7SUFDbkQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7SUFDM0QsZ0JBQWdCLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMzQyxjQUFjLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUM1QixhQUFhLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUMzQixnQkFBZ0IsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsMERBQTBEO0lBQzFGLE1BQU0sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3BCLE1BQU0sRUFBRSxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ3RGLFVBQVUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ3BDLENBQUMsQ0FBQTtBQUVGLGtCQUFlLGFBQWEsQ0FBQSJ9
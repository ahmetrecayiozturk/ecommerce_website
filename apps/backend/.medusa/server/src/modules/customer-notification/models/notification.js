"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerNotification = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.CustomerNotification = utils_1.model.define("customer_notification", {
    id: utils_1.model.id().primaryKey(),
    customer_id: utils_1.model.text().searchable(),
    subject: utils_1.model.text(),
    message: utils_1.model.text(),
    is_read: utils_1.model.boolean().default(false)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvY3VzdG9tZXItbm90aWZpY2F0aW9uL21vZGVscy9ub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRXBDLFFBQUEsb0JBQW9CLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRTtJQUN4RSxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixXQUFXLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUN0QyxPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNyQixPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNyQixPQUFPLEVBQUUsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Q0FDeEMsQ0FBQyxDQUFBIn0=
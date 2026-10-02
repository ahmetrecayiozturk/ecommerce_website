"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_NOTIFICATION_MODULE = void 0;
const utils_1 = require("@medusajs/framework/utils");
const utils_2 = require("@medusajs/framework/utils");
const notification_1 = require("./models/notification");
class CustomerNotificationService extends (0, utils_2.MedusaService)({
    CustomerNotification: notification_1.CustomerNotification,
}) {
}
exports.CUSTOMER_NOTIFICATION_MODULE = "customerNotification";
exports.default = (0, utils_1.Module)(exports.CUSTOMER_NOTIFICATION_MODULE, {
    service: CustomerNotificationService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jdXN0b21lci1ub3RpZmljYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWtEO0FBQ2xELHFEQUF5RDtBQUN6RCx3REFBNEQ7QUFFNUQsTUFBTSwyQkFBNEIsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDdEQsb0JBQW9CLEVBQXBCLG1DQUFvQjtDQUNyQixDQUFDO0NBQUc7QUFFUSxRQUFBLDRCQUE0QixHQUFHLHNCQUFzQixDQUFBO0FBRWxFLGtCQUFlLElBQUEsY0FBTSxFQUFDLG9DQUE0QixFQUFFO0lBQ2xELE9BQU8sRUFBRSwyQkFBMkI7Q0FDckMsQ0FBQyxDQUFBIn0=
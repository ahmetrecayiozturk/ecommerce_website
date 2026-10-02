"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderCacheRevalidateHandler;
const revalidate_storefront_1 = require("../utils/revalidate-storefront");
async function orderCacheRevalidateHandler({ event, }) {
    console.log(`Sipariş olayı yakalandı: ${event.name} — storefront önbelleği temizleniyor`);
    await (0, revalidate_storefront_1.revalidateStorefrontOrders)();
}
exports.config = {
    event: [
        "order.placed",
        "order.updated",
        "order.canceled",
        "order.completed",
        "order.fulfillment_created",
        "order.fulfillment_canceled",
        "order.payment_captured",
        "order.return_requested",
        "shipment.created",
        "delivery.created",
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FjaGUtcmV2YWxpZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9vcmRlci1jYWNoZS1yZXZhbGlkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDhDQUtDO0FBUEQsMEVBQTJFO0FBRTVELEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxFQUN4RCxLQUFLLEdBQ2U7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsS0FBSyxDQUFDLElBQUksc0NBQXNDLENBQUMsQ0FBQTtJQUN6RixNQUFNLElBQUEsa0RBQTBCLEdBQUUsQ0FBQTtBQUNwQyxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGNBQWM7UUFDZCxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsNEJBQTRCO1FBQzVCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsa0JBQWtCO1FBQ2xCLGtCQUFrQjtLQUNuQjtDQUNGLENBQUEifQ==
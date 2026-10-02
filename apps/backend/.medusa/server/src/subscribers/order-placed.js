"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const utils_1 = require("@medusajs/framework/utils");
async function orderPlacedHandler({ event: { data }, container, }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const orderService = container.resolve(utils_1.Modules.ORDER);
    // 1. Verilen siparişin detaylarını çekiyoruz
    const order = await orderService.retrieveOrder(data.id);
    if (!order.email)
        return;
    console.log(`[SendGrid] ${order.email} adresine sipariş onayı gönderiliyor...`);
    // 2. SendGrid motorunu tetikliyoruz
    await notificationService.createNotifications({
        to: order.email,
        channel: "email",
        template: process.env.SENDGRID_ORDER_PLACED_TPL,
        data: {
            // Bu bilgileri SendGrid şablonunda {{ order_id }} olarak kullanabilirsin
            order_id: order.display_id || order.id,
            total: order.total
        },
    });
}
exports.config = {
    event: "order.placed", // Sadece sipariş oluşturulduğunda tetiklenir
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxxQ0F5QkM7QUEzQkQscURBQW1EO0FBRXBDLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUMvQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFDZixTQUFTLEdBQ3NCO0lBQy9CLE1BQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkUsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFckQsNkNBQTZDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1FBQUUsT0FBTTtJQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsS0FBSyxDQUFDLEtBQUsseUNBQXlDLENBQUMsQ0FBQTtJQUUvRSxvQ0FBb0M7SUFDcEMsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxFQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUs7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBbUM7UUFDekQsSUFBSSxFQUFFO1lBQ0oseUVBQXlFO1lBQ3pFLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztTQUNuQjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGNBQWMsRUFBRSw2Q0FBNkM7Q0FDckUsQ0FBQSJ9
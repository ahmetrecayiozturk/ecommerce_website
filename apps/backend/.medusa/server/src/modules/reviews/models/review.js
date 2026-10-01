"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const Review = utils_1.model.define("review", {
    id: utils_1.model.id().primaryKey(),
    product_id: utils_1.model.text().index("IDX_review_product_id"),
    customer_id: utils_1.model.text().nullable(),
    customer_name: utils_1.model.text(),
    rating: utils_1.model.number(), // 1-5
    title: utils_1.model.text().nullable(),
    content: utils_1.model.text(),
    status: utils_1.model.enum(["pending", "approved", "rejected"]).default("pending"),
    order_id: utils_1.model.text().nullable(), // satın alma doğrulaması için (opsiyonel)
});
exports.default = Review;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcmV2aWV3cy9tb2RlbHMvcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWlEO0FBRWpELE1BQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0lBQ3BDLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLFVBQVUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BDLGFBQWEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQzNCLE1BQU0sRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTTtJQUM5QixLQUFLLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM5QixPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNyQixNQUFNLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzFFLFFBQVEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsMENBQTBDO0NBQzlFLENBQUMsQ0FBQTtBQUVGLGtCQUFlLE1BQU0sQ0FBQSJ9
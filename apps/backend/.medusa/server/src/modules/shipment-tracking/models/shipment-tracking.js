"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const ShipmentTracking = utils_1.model.define("shipment_tracking", {
    id: utils_1.model.id().primaryKey(),
    order_id: utils_1.model.text().index("IDX_shipment_tracking_order_id"),
    fulfillment_id: utils_1.model.text().nullable(),
    carrier: utils_1.model.enum([
        "yurtici",
        "aras",
        "mng",
        "ptt",
        "surat",
        "ups",
        "other",
    ]),
    carrier_name: utils_1.model.text().nullable(), // carrier = "other" ise serbest metin
    tracking_number: utils_1.model.text(),
    tracking_url: utils_1.model.text().nullable(),
    status: utils_1.model
        .enum([
        "preparing",
        "shipped",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "failed",
    ])
        .default("preparing"),
    status_history: utils_1.model.json().default([]), // [{status, note, created_at}]
});
exports.default = ShipmentTracking;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQtdHJhY2tpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zaGlwbWVudC10cmFja2luZy9tb2RlbHMvc2hpcG1lbnQtdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUQ7QUFFakQsTUFBTSxnQkFBZ0IsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO0lBQ3pELEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLFFBQVEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDO0lBQzlELGNBQWMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3ZDLE9BQU8sRUFBRSxhQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xCLFNBQVM7UUFDVCxNQUFNO1FBQ04sS0FBSztRQUNMLEtBQUs7UUFDTCxPQUFPO1FBQ1AsS0FBSztRQUNMLE9BQU87S0FDUixDQUFDO0lBQ0YsWUFBWSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxzQ0FBc0M7SUFDN0UsZUFBZSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDN0IsWUFBWSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsTUFBTSxFQUFFLGFBQUs7U0FDVixJQUFJLENBQUM7UUFDSixXQUFXO1FBQ1gsU0FBUztRQUNULFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsV0FBVztRQUNYLFFBQVE7S0FDVCxDQUFDO1NBQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUN2QixjQUFjLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSwrQkFBK0I7Q0FDMUUsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsZ0JBQWdCLENBQUEifQ==
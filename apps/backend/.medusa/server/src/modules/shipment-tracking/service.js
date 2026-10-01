"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const shipment_tracking_1 = __importDefault(require("./models/shipment-tracking"));
const CARRIER_URL_TEMPLATES = {
    yurtici: "https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code={code}",
    aras: "https://kargotakip.araskargo.com.tr/mainpage.aspx?code={code}",
    mng: "https://www.mngkargo.com.tr/gonderitakip?takipNo={code}",
    ptt: "https://gonderitakip.ptt.gov.tr/Track/Verify?q={code}",
    surat: "https://www.suratkargo.com.tr/KargoTakip?code={code}",
    ups: "https://www.ups.com/track?tracknum={code}",
};
class ShipmentTrackingModuleService extends (0, utils_1.MedusaService)({
    ShipmentTracking: shipment_tracking_1.default,
}) {
    async buildTrackingUrl(carrier, trackingNumber) {
        const template = CARRIER_URL_TEMPLATES[carrier];
        if (!template)
            return null;
        return template.replace("{code}", encodeURIComponent(trackingNumber));
    }
    async addStatusUpdate(id, status, note) {
        const tracking = await this.retrieveShipmentTracking(id);
        const history = Array.isArray(tracking.status_history)
            ? tracking.status_history
            : [];
        history.push({
            status,
            note: note ?? null,
            created_at: new Date().toISOString(),
        });
        return this.updateShipmentTrackings({
            id,
            status: status,
            status_history: history,
        });
    }
}
exports.default = ShipmentTrackingModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NoaXBtZW50LXRyYWNraW5nL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBeUQ7QUFDekQsbUZBQXlEO0FBRXpELE1BQU0scUJBQXFCLEdBQTJCO0lBQ3BELE9BQU8sRUFBRSw4RUFBOEU7SUFDdkYsSUFBSSxFQUFFLCtEQUErRDtJQUNyRSxHQUFHLEVBQUUseURBQXlEO0lBQzlELEdBQUcsRUFBRSx1REFBdUQ7SUFDNUQsS0FBSyxFQUFFLHNEQUFzRDtJQUM3RCxHQUFHLEVBQUUsMkNBQTJDO0NBQ2pELENBQUE7QUFFRCxNQUFNLDZCQUE4QixTQUFRLElBQUEscUJBQWEsRUFBQztJQUN4RCxnQkFBZ0IsRUFBaEIsMkJBQWdCO0NBQ2pCLENBQUM7SUFDQSxLQUFLLENBQUMsZ0JBQWdCLENBQ3BCLE9BQWUsRUFDZixjQUFzQjtRQUV0QixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQzFCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFVLEVBQUUsTUFBYyxFQUFFLElBQWE7UUFDN0QsTUFBTSxRQUFRLEdBQVEsTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0QsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYztZQUN6QixDQUFDLENBQUMsRUFBRSxDQUFBO1FBRU4sT0FBTyxDQUFDLElBQUksQ0FBQztZQUNYLE1BQU07WUFDTixJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUk7WUFDbEIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1NBQ3JDLENBQUMsQ0FBQTtRQUVGLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLEVBQUU7WUFDRixNQUFNLEVBQUUsTUFBYTtZQUNyQixjQUFjLEVBQUUsT0FBYztTQUN4QixDQUFDLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSw2QkFBNkIsQ0FBQSJ9
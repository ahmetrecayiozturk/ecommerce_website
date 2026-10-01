"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260912021940 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260912021940 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "shipment_tracking" ("id" text not null, "order_id" text not null, "fulfillment_id" text null, "carrier" text check ("carrier" in ('yurtici', 'aras', 'mng', 'ptt', 'surat', 'ups', 'other')) not null, "carrier_name" text null, "tracking_number" text not null, "tracking_url" text null, "status" text check ("status" in ('preparing', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'failed')) not null default 'preparing', "status_history" jsonb not null default '[]', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "shipment_tracking_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shipment_tracking_order_id" ON "shipment_tracking" ("order_id") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shipment_tracking_deleted_at" ON "shipment_tracking" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "shipment_tracking" cascade;`);
    }
}
exports.Migration20260912021940 = Migration20260912021940;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MTIwMjE5NDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zaGlwbWVudC10cmFja2luZy9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwOTEyMDIxOTQwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFxRTtBQUVyRSxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBRTNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtckJBQW1yQixDQUFDLENBQUM7UUFDanNCLElBQUksQ0FBQyxNQUFNLENBQUMsMkhBQTJILENBQUMsQ0FBQztRQUN6SSxJQUFJLENBQUMsTUFBTSxDQUFDLCtIQUErSCxDQUFDLENBQUM7SUFDL0ksQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBRUY7QUFaRCwwREFZQyJ9
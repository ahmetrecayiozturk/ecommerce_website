"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260919115607 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260919115607 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "support_ticket" ("id" text not null, "order_id" text null, "order_display_id" integer null, "customer_email" text not null, "customer_name" text not null, "subject" text not null, "status" text check ("status" in ('open', 'closed')) not null default 'open', "messages" jsonb not null default '[]', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "support_ticket_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_support_ticket_customer_email" ON "support_ticket" ("customer_email") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_support_ticket_deleted_at" ON "support_ticket" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "support_ticket" cascade;`);
    }
}
exports.Migration20260919115607 = Migration20260919115607;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MTkxMTU2MDcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zdXBwb3J0LXRpY2tldHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDkxOTExNTYwNy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsOGZBQThmLENBQUMsQ0FBQztRQUM1Z0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpSUFBaUksQ0FBQyxDQUFDO1FBQy9JLElBQUksQ0FBQyxNQUFNLENBQUMseUhBQXlILENBQUMsQ0FBQztJQUN6SSxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FFRjtBQVpELDBEQVlDIn0=
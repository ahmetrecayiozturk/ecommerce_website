"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260913121131 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260913121131 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "return_request" ("id" text not null, "order_id" text not null, "order_display_id" integer null, "customer_email" text not null, "customer_name" text not null, "item_description" text not null, "reason" text not null, "status" text check ("status" in ('pending', 'approved', 'rejected', 'refunded')) not null default 'pending', "admin_note" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "return_request_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_return_request_order_id" ON "return_request" ("order_id") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_return_request_deleted_at" ON "return_request" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "return_request" cascade;`);
    }
}
exports.Migration20260913121131 = Migration20260913121131;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MTMxMjExMzEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXR1cm4tcmVxdWVzdHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDkxMzEyMTEzMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsbWpCQUFtakIsQ0FBQyxDQUFDO1FBQ2prQixJQUFJLENBQUMsTUFBTSxDQUFDLHFIQUFxSCxDQUFDLENBQUM7UUFDbkksSUFBSSxDQUFDLE1BQU0sQ0FBQyx5SEFBeUgsQ0FBQyxDQUFDO0lBQ3pJLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUVGO0FBWkQsMERBWUMifQ==
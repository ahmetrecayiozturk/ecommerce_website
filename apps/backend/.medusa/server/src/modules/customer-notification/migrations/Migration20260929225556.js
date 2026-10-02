"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260929225556 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260929225556 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "customer_notification" ("id" text not null, "customer_id" text not null, "subject" text not null, "message" text not null, "is_read" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "customer_notification_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_customer_notification_deleted_at" ON "customer_notification" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "customer_notification" cascade;`);
    }
}
exports.Migration20260929225556 = Migration20260929225556;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MjkyMjU1NTYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jdXN0b21lci1ub3RpZmljYXRpb24vbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDkyOTIyNTU1Ni50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsZ1lBQWdZLENBQUMsQ0FBQztRQUM5WSxJQUFJLENBQUMsTUFBTSxDQUFDLHVJQUF1SSxDQUFDLENBQUM7SUFDdkosQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsdURBQXVELENBQUMsQ0FBQztJQUN2RSxDQUFDO0NBRUY7QUFYRCwwREFXQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260912021924 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260912021924 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "review" ("id" text not null, "product_id" text not null, "customer_id" text null, "customer_name" text not null, "rating" integer not null, "title" text null, "content" text not null, "status" text check ("status" in ('pending', 'approved', 'rejected')) not null default 'pending', "order_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "review_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_review_product_id" ON "review" ("product_id") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_review_deleted_at" ON "review" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "review" cascade;`);
    }
}
exports.Migration20260912021924 = Migration20260912021924;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MTIwMjE5MjQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXZpZXdzL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNjA5MTIwMjE5MjQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQXFFO0FBRXJFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLDRmQUE0ZixDQUFDLENBQUM7UUFDMWdCLElBQUksQ0FBQyxNQUFNLENBQUMseUdBQXlHLENBQUMsQ0FBQztRQUN2SCxJQUFJLENBQUMsTUFBTSxDQUFDLHlHQUF5RyxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBRUY7QUFaRCwwREFZQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260920014327 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260920014327 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "return_request" add column if not exists "return_carrier" text check ("return_carrier" in ('yurtici', 'aras', 'mng', 'ptt', 'surat', 'ups', 'other')) null, add column if not exists "return_code" text null, add column if not exists "return_instructions" text null;`);
    }
    async down() {
        this.addSql(`alter table if exists "return_request" drop column if exists "return_carrier", drop column if exists "return_code", drop column if exists "return_instructions";`);
    }
}
exports.Migration20260920014327 = Migration20260920014327;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MjAwMTQzMjcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXR1cm4tcmVxdWVzdHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDkyMDAxNDMyNy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsZ1NBQWdTLENBQUMsQ0FBQztJQUNoVCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrS0FBa0ssQ0FBQyxDQUFDO0lBQ2xMLENBQUM7Q0FFRjtBQVZELDBEQVVDIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260915001951 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260915001951 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "return_request" add column if not exists "type" text check ("type" in ('return', 'cancellation')) not null default 'return';`);
    }
    async down() {
        this.addSql(`alter table if exists "return_request" drop column if exists "type";`);
    }
}
exports.Migration20260915001951 = Migration20260915001951;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA5MTUwMDE5NTEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXR1cm4tcmVxdWVzdHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDkxNTAwMTk1MS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMscUpBQXFKLENBQUMsQ0FBQztJQUNySyxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Q0FFRjtBQVZELDBEQVVDIn0=
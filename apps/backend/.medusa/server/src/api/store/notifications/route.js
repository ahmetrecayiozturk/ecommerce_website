"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
async function GET(req, res) {
    try {
        // TS Hatasını önlemek için as any kullanıyoruz
        const customerId = req.auth_context?.actor_id;
        if (!customerId)
            return res.status(401).json({ message: "Oturum açılmadı." });
        const notificationService = req.scope.resolve("customerNotification");
        const notifications = await notificationService.listCustomerNotifications({ customer_id: customerId }, { order: { created_at: "DESC" } });
        res.json({ notifications });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL25vdGlmaWNhdGlvbnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFnQkM7QUFoQk0sS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELElBQUksQ0FBQztRQUNILCtDQUErQztRQUMvQyxNQUFNLFVBQVUsR0FBSSxHQUFXLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQTtRQUN0RCxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFBO1FBRTdFLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQVEsQ0FBQTtRQUM1RSxNQUFNLGFBQWEsR0FBRyxNQUFNLG1CQUFtQixDQUFDLHlCQUF5QixDQUN2RSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFDM0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDbEMsQ0FBQTtRQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ2hELENBQUM7QUFDSCxDQUFDIn0=
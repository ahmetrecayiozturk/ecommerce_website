"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function GET(req, res) {
    try {
        const notificationService = req.scope.resolve("customerNotification");
        const customerModule = req.scope.resolve(utils_1.Modules.CUSTOMER);
        // 1. Geçmiş Bildirimleri Çek
        const notifications = await notificationService.listCustomerNotifications({}, { order: { created_at: "DESC" }, take: 200 });
        const grouped = [];
        const seen = new Set();
        for (const n of notifications) {
            const key = `${n.subject}-${n.message}`;
            if (!seen.has(key)) {
                seen.add(key);
                grouped.push({ id: n.id, subject: n.subject, message: n.message, created_at: n.created_at });
            }
        }
        // 2. Müşteri Listesini Çek (YENİ - Arayüzdeki dropdown için)
        const customers = await customerModule.listCustomers({}, { take: 200, order: { created_at: "DESC" } });
        const customerList = customers.map((c) => ({
            id: c.id,
            email: c.email,
            name: `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'İsimsiz'
        })).filter((c) => c.email); // Sadece maili olanları al
        res.json({
            history: grouped.slice(0, 10),
            customers: customerList
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function POST(req, res) {
    try {
        const { subject, message, email, sendEmail, sendNotification } = req.body;
        const customerModule = req.scope.resolve(utils_1.Modules.CUSTOMER);
        const notificationService = req.scope.resolve("customerNotification");
        let customers = [];
        if (email && email.trim() !== "") {
            const foundCustomers = await customerModule.listCustomers({ email: email.trim() });
            if (foundCustomers.length > 0) {
                customers = [foundCustomers[0]];
            }
        }
        else {
            customers = await customerModule.listCustomers({}, { take: 9999 });
        }
        if (customers.length === 0) {
            return res.status(400).json({ message: "Bu kritere uyan müşteri bulunamadı." });
        }
        if (sendNotification) {
            const notificationsToCreate = customers.map(c => ({
                customer_id: c.id,
                subject,
                message,
                is_read: false
            }));
            await notificationService.createCustomerNotifications(notificationsToCreate);
        }
        if (sendEmail) {
            const emails = customers.map((c) => c.email).filter(Boolean);
            const sendgridApiKey = process.env.SENDGRID_API_KEY;
            const fromEmail = process.env.SENDGRID_FROM;
            if (sendgridApiKey && fromEmail && emails.length > 0) {
                const bccList = emails.map(e => ({ email: e }));
                const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${sendgridApiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        personalizations: [{
                                to: [{ email: fromEmail }],
                                bcc: bccList
                            }],
                        from: { email: fromEmail },
                        subject: subject,
                        content: [{
                                type: "text/html",
                                value: `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</div>`
                            }]
                    })
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("SendGrid Hatası:", errorData);
                }
            }
        }
        res.json({ success: true, count: customers.length });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2Jyb2FkY2FzdC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQW9DQztBQUVELG9CQXFFQztBQTdHRCxxREFBbUQ7QUFFNUMsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELElBQUksQ0FBQztRQUNILE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQVEsQ0FBQTtRQUM1RSxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFMUQsNkJBQTZCO1FBQzdCLE1BQU0sYUFBYSxHQUFHLE1BQU0sbUJBQW1CLENBQUMseUJBQXlCLENBQ3ZFLEVBQUUsRUFDRixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQzdDLENBQUE7UUFFRCxNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQzlCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUs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
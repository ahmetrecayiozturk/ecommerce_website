"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = passwordResetHandler;
// Tip tanımlamasını "any" yaparak Medusa'nın tüm verilerini özgürce okuyoruz
async function passwordResetHandler({ event: { data }, }) {
    // DÜZELTME BURADA: Medusa v2 emailpass modülü, e-posta adresini "entity_id" içinde gönderir!
    const userEmail = data.entity_id || data.email || data.identifier;
    if (!userEmail) {
        console.error("[SendGrid] E-posta adresi bulunamadı! Medusa'nın gönderdiği ham veri:", JSON.stringify(data));
        return;
    }
    console.log(`[SendGrid] ${userEmail} adresine şifre sıfırlama linki gönderiliyor...`);
    // E-postadaki butona tıklandığında gidilecek adres
    const resetLink = `${process.env.STORE_CORS}/reset-password?token=${data.token}&email=${userEmail}`;
    // GELİŞTİRİCİ HACK'İ: Mail gitmese bile linki terminalden alıp test edebilmek için
    console.log("\n=======================================================");
    console.log("🔑 ŞİFRE SIFIRLAMA LİNKİ (BURADAN KOPYALA):");
    console.log(resetLink);
    console.log("=======================================================\n");
    try {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: userEmail }],
                        dynamic_template_data: {
                            reset_link: resetLink,
                            order_id: "Şifre Sıfırlama" // Şablonun hata vermemesi için
                        }
                    }
                ],
                from: { email: process.env.SENDGRID_FROM_EMAIL || process.env.SENDGRID_FROM },
                template_id: process.env.SENDGRID_FORGOT_PASSWORD_TPL
            })
        });
        if (response.ok) {
            console.log("✅ [SendGrid] E-posta BAŞARIYLA gönderildi!");
        }
        else {
            const err = await response.text();
            console.error("❌ [SendGrid] Gönderim hatası:", err);
        }
    }
    catch (err) {
        console.error("❌ [SendGrid] API'ye bağlanırken hata oluştu:", err);
    }
}
exports.config = {
    event: "auth.password_reset",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtcmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvcGFzc3dvcmQtcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBcURDO0FBdERELDZFQUE2RTtBQUM5RCxLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFDakQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ0s7SUFFcEIsNkZBQTZGO0lBQzdGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRWxFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUVBQXVFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdHLE9BQU87SUFDVCxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLFNBQVMsaURBQWlELENBQUMsQ0FBQztJQUV0RixtREFBbUQ7SUFDckQsTUFBTSxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUseUJBQXlCLElBQUksQ0FBQyxLQUFLLFVBQVUsU0FBUyxFQUFFLENBQUM7SUFFbEcsbUZBQW1GO0lBQ25GLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkRBQTJELENBQUMsQ0FBQztJQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7SUFDekUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsdUNBQXVDLEVBQUU7WUFDcEUsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFLFVBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekQsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixnQkFBZ0IsRUFBRTtvQkFDaEI7d0JBQ0UsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQzFCLHFCQUFxQixFQUFFOzRCQUNyQixVQUFVLEVBQUUsU0FBUzs0QkFDckIsUUFBUSxFQUFFLGlCQUFpQixDQUFDLCtCQUErQjt5QkFDNUQ7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7Z0JBQzdFLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QjthQUN0RCxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQzVELENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxxQkFBcUI7Q0FDN0IsQ0FBQSJ9
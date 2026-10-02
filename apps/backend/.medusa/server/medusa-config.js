"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
module.exports = (0, utils_1.defineConfig)({
    admin: {
        disable: false,
        backendUrl: "https://ecommerce-website-7nwl.onrender.com",
    },
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            authCors: process.env.AUTH_CORS,
            jwtSecret: process.env.JWT_SECRET,
            cookieSecret: process.env.COOKIE_SECRET,
        }
    },
    modules: [
        {
            resolve: "./src/modules/reviews",
        },
        {
            resolve: "./src/modules/return-requests",
        },
        {
            resolve: "./src/modules/support-tickets",
        },
        {
            resolve: "./src/modules/shipment-tracking",
        },
        {
            resolve: "@medusajs/medusa/payment",
            options: {
                providers: [
                    {
                        resolve: "./src/modules/payment-iyzico",
                        id: "iyzico",
                        options: {
                            api_key: process.env.IYZICO_API_KEY,
                            secret_key: process.env.IYZICO_SECRET_KEY,
                            base_url: process.env.IYZICO_BASE_URL,
                        },
                    },
                ],
            },
        },
        {
            resolve: "./src/modules/customer-notification",
        },
        // Medusa v2 SendGrid Notification Provider
        {
            resolve: "@medusajs/medusa/notification",
            options: {
                providers: [
                    {
                        resolve: "@medusajs/notification-sendgrid",
                        id: "sendgrid",
                        options: {
                            channels: ["email"],
                            api_key: process.env.SENDGRID_API_KEY,
                            from: process.env.SENDGRID_FROM,
                        },
                    },
                ],
            },
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzlCLEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFLDZDQUE2QztLQUMxRDtJQUNELGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1lBQ2xDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVU7WUFDaEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtZQUNqQyxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1NBQ3hDO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUDtZQUNFLE9BQU8sRUFBRSx1QkFBdUI7U0FDakM7UUFDRDtZQUNFLE9BQU8sRUFBRSwrQkFBK0I7U0FDekM7UUFDRDtZQUNFLE9BQU8sRUFBRSwrQkFBK0I7U0FDekM7UUFDRDtZQUNFLE9BQU8sRUFBRSxpQ0FBaUM7U0FDM0M7UUFDRDtZQUNFLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsOEJBQThCO3dCQUN2QyxFQUFFLEVBQUUsUUFBUTt3QkFDWixPQUFPLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYzs0QkFDbkMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCOzRCQUN6QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO3lCQUN0QztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFDRDtZQUNFLE9BQU8sRUFBRSxxQ0FBcUM7U0FDL0M7UUFDRCwyQ0FBMkM7UUFDM0M7WUFDRSxPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlDQUFpQzt3QkFDMUMsRUFBRSxFQUFFLFVBQVU7d0JBQ2QsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQzs0QkFDbkIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCOzRCQUNyQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO3lCQUNoQztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMsQ0FBQSJ9
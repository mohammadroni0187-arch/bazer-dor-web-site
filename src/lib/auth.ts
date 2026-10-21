import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("Bazerdor-Website");

export const auth = betterAuth({
  
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  
  trustedOrigins: [
    "http://localhost:3000",
     "https://bazer-dor-web-site.vercel.app",
    "https://bazer-dor-web-site-5irzi4pfw-md-roni2.vercel.app",
  ],
  

   emailAndPassword: { 
    enabled: true, 
  }, 
   account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      disableImplicitLinking: false,
    },
  },
  socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string, 
        }, 
         github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string, 
        },
      
      },
  database: mongodbAdapter(db, {
    client,
  }),
});
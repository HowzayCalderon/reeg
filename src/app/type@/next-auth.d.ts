import { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: unknown | string,
            username: String | string,
            role: unknown | string,
        } & DefaultSession["user"]
    }
    interface User {
        username? : any
        role?: any,
    }
    
}

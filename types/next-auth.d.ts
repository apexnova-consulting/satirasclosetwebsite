import { DefaultSession } from "next-auth";

type UserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }

  interface JWT {
    role?: UserRole;
  }
} 
import { Session } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    avatarURL: string;
    name: string;
  }
}
declare module "next-auth" {
  interface Session {
    access_token: string | null;
    avatarURL: string;
    name: string;
  }
}

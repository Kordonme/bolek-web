import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { randomInt } from "node:crypto";
import { ServerClient } from "postmark";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  debug: env.NODE_ENV !== "production",
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      generateVerificationToken() {
        return randomInt(100001, 999999).toString();
      },
      async sendVerificationRequest(params) {
        const { identifier, token } = params;
        const client = new ServerClient(env.EMAIL_SERVER_USER);

        await client.sendEmailWithTemplate({
          TemplateAlias: "verification-code",
          From: "noreply@bolek.dk",
          TemplateModel: {
            product_name: "Bolek",
            code: token,
            support_email: "info@bolek.dk",
          },
          To: identifier,
        });
      },
    }),
  ],
};

export default NextAuth(authOptions);

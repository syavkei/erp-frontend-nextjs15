import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { email, jwt } from "zod";
import { id } from "zod/v4/locales";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "strapi",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.jwt) {
          throw new Error(data.error?.message || "Login Failed");
        }

        // Return uder objectto store in session
        return {
          id: data.user.id,
          name: data.user.name,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          jwt: data.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.jwt = token.jwt;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

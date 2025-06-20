import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getPipedreamClient } from "@/lib/pipedream";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Store the access token in the JWT
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the access token available to the client
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

const { pd, token, expires_at, connect_link_url } = await getPipedreamClient();
console.log(`pd ${pd} token ${token} expires_at ${expires_at} connect_link_url ${connect_link_url}`);

export { handler as GET, handler as POST }; 
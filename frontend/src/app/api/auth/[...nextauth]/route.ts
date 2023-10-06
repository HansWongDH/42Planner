import NextAuth, { NextAuthOptions } from 'next-auth';
import FortyTwoProvider from 'next-auth/providers/42-school';

const authOptions: NextAuthOptions = {
  providers: [
    FortyTwoProvider({
      clientId: process.env.FT_OAUTH_UID ?? '',
      clientSecret: process.env.FT_OAUTH_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log(account)
        token.access_token = account.access_token ?? '';;
      }

      return token
    },
  async session({session, token})
  {
    session.access_token = token.access_token;
    return session;
  }
},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
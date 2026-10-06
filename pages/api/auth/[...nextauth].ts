import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Portfolio sign-in',
      credentials: {},
      // No account system is configured. Never authenticate arbitrary visitors.
      async authorize() {
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);

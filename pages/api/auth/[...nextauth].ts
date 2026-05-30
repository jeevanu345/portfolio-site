import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Dummy credentials/authorization
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-next-auth-dev',
  providers: [
    CredentialsProvider({
      name: 'V9 Credentials',
      credentials: {
        username: { label: 'TempUsername', type: 'text', placeholder: 'v9p' },
        password: { label: 'TempPassword', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        return {
          id: 1,
          name: 'Visitor',
          email: 'visitor@jeevanu345.github.io',
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);

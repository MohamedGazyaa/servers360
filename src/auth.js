import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const USERS_URL = `${process.env.MOCKAPI_BASE_URL}/users`;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const res = await fetch(USERS_URL);
          if (!res.ok) return null;
          const users = await res.json();
          const user = users.find(
            (u) => u.email === credentials?.email && u.password === credentials?.password
          );
          if (!user) return null;
          return { id: user.email, name: user.name, email: user.email };
        } catch {
          return null;
        }
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const res = await fetch(USERS_URL);
          if (!res.ok) return false;
          const users = await res.json();
          const existing = users.find((u) => u.email === user.email);
          if (!existing) {
            await fetch(USERS_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: null,
                providers: [account.provider],
              }),
            });
          } else {
            const currentProviders = existing.providers
              ?? (existing.provider ? [existing.provider] : []);
            if (!currentProviders.includes(account.provider)) {
              await fetch(`${USERS_URL}/${existing.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...existing,
                  providers: [...currentProviders, account.provider],
                }),
              });
            }
          }
        } catch {
          return false;
        }
      }
      return true;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});

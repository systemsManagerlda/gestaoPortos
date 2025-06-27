import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Aqui você valida o usuário (exemplo básico)
        if (
          credentials.email === "jose@example.com" &&
          credentials.password === "123456"
        ) {
          return { id: 1, name: "José Eduardo", email: "jose@example.com" }
        }
        return null
      }
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // Página customizada de login
  }
})

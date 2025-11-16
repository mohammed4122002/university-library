import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({

      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "example@email.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "********",
        },
      },
  
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null 
        }

   
        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1)

        const user = userResult[0]
        if (!user) return null 

   
        const isValid = await compare(credentials.password, user.password)
        if (!isValid) return null 

      
        return {
          id: user.id.toString(),
          name: user.fullName,
          email: user.email,
        }
      },
    }),
  ],
})

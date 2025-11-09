import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // 🧩 الحقول التي تظهر في صفحة تسجيل الدخول الافتراضية
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
      // 🧠 الدالة الأساسية التي تنفذ التحقق من المستخدم
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null // لو ناقص بيانات
        }

        // 🔍 البحث عن المستخدم في قاعدة البيانات
        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1)

        const user = userResult[0]
        if (!user) return null // المستخدم غير موجود

        // 🔑 التحقق من كلمة المرور باستخدام bcrypt
        const isValid = await compare(credentials.password, user.password)
        if (!isValid) return null // كلمة المرور خطأ

        // ✅ إرجاع كائن المستخدم إذا نجحت عملية الدخول
        return {
          id: user.id.toString(),
          name: user.fullName,
          email: user.email,
        }
      },
    }),
  ],
})

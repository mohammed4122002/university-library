// proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ هذا يعادل تمامًا: export { auth as middleware } from "@/auth"
export async function proxy(request: NextRequest) {
  const session = await auth();

  const protectedPaths = ["/dashboard", "/profile", "/admin"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // السماح بالمرور لأي مسار آخر
  return NextResponse.next();
}

// // تحديد المسارات التي يعمل عليها الـ Proxy
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };

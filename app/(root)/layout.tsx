import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
   const session = await auth();
console.log("session" , session);

  if (!session) redirect("/sing-in");
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // مكتبة المساعدة من shadcn

export default function Header() {
  const pathName = usePathname();

  return (
    <header className="my-10 flex justify-between items-center gap-5">
      {/* logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="BookWise Logo" width={40} height={40} />
        <span className="font-bebas-neue text-2xl text-light-100">BookWise</span>
      </Link>

      {/* navigation links */}
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base capitalize cursor-pointer transition-colors",
              pathName === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href="/Search"
            className={cn(
              "text-base capitalize cursor-pointer transition-colors",
              pathName === "/Search" ? "text-light-200" : "text-light-100"
            )}
          >
            Search
          </Link>
        </li>
      </ul>
    </header>
  );
}

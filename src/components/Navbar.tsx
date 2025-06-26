"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./MobileSidebar";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/my-bookings", label: "My Bookings" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b border-yellow-600 bg-gradient-to-r from-black via-zinc-900 to-black shadow-md">
      {/* Left: Mobile Sidebar + Logo */}
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="font-serif text-2xl text-yellow-400 select-none">
          NSM Elite Looks
        </h1>
        <Image
          src="/images/logo.jpg"
          alt="NSM Elite Looks Logo"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
      </div>

      {/* Right: Desktop Nav Links + ModeToggle + Auth */}
      <div className="hidden sm:flex items-center space-x-8 text-base font-semibold text-gray-300">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "hover:text-yellow-400 transition-colors duration-300",
              pathname === href
                ? "text-yellow-400 underline decoration-yellow-400"
                : "text-gray-300"
            )}
          >
            {label}
          </Link>
        ))}

        

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 border border-yellow-400 rounded text-yellow-400 hover:bg-yellow-400 hover:text-black transition-shadow duration-300 shadow-md hover:shadow-yellow-400/70">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}

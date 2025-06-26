"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle, // ✅ import this
} from "@/components/ui/sheet";
import { Menu, LinkIcon, MapPinIcon, LogOut } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
  useClerk,
  UserButton,
} from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="sm:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition-colors" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col p-6 space-y-6 bg-black text-yellow-400 min-w-[250px] shadow-xl shadow-yellow-900/40"
      >
        {/* ✅ Required for accessibility */}
        <SheetTitle className="text-lg font-bold text-yellow-400">
          NSM Elite Looks Menu
        </SheetTitle>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 text-lg font-medium">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">Services</Link>
          <Link href="/book" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">Book</Link>
          <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">My Bookings</Link>
        </nav>

        <Separator className="my-4 border-yellow-600" />

        <SignedIn>
          {user && (
            <div className="flex flex-col items-center text-center mt-4 space-y-2">
              <Avatar className="w-20 h-20 border-2 border-yellow-400">
                <AvatarImage
                  className="rounded-3xl"
                  src={user.imageUrl || "/avatar.png"}
                  alt={user.fullName || "User"}
                />
              </Avatar>

              <div>
                <h3 className="font-semibold">{user.fullName}</h3>
                <p className="text-sm text-yellow-500">{user.username || `You're Signed In`}</p>
              </div>

              <div className="flex flex-col text-sm mt-2 space-y-1">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span className="truncate">
                    {typeof user?.publicMetadata?.location === "string"
                      ? user.publicMetadata.location
                      : "No location"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {user?.publicMetadata?.website ? (
                    <a
                      href={user.publicMetadata.website.toString()}
                      className="hover:underline truncate"
                      target="_blank"
                    >
                      {user.publicMetadata.website?.toString()}
                    </a>
                  ) : (
                    " "
                  )}
                </div>
              </div>

              <UserButton afterSignOutUrl="/" />

              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="mt-4 w-full px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition rounded flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="space-y-3">
            <SignInButton mode="modal">
              <button className="w-full px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition shadow">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="w-full px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition shadow">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
}

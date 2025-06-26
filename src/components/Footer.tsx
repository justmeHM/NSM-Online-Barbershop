"use client";

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 mt-16 border-t border-yellow-700">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left section */}
        <p className="text-sm text-center sm:text-left text-yellow-400 font-serif select-none">
          &copy; {new Date().getFullYear()} NSM Elite Looks. All rights reserved.
        </p>

        {/* Right section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-center sm:text-right">
          <div className="space-x-6">
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:contact@nsmelitelooks.com" className="hover:text-yellow-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start gap-6 text-gray-600 dark:text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:contact@nsmelitelooks.com"
              className="hover:text-yellow-400 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

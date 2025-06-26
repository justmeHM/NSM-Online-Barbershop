"use client";

import { HaircutCarousel } from "@/components/HaircutCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import Highlights from "@/components/Highlights";
import FAQSection from "@/components/FaqSection";
import { RoleRedirect } from "@/components/RoleRedirect";

export default function HomePage() {
  return (
    <>
      <RoleRedirect /> {/* ✅ Put this at the very top of the page */}

      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-black text-yellow-400">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
          Premium Grooming at Your Convenience
        </h1>

        <HeroSection />

        <p className="text-lg max-w-xl mb-10 text-yellow-200/90">
          NSM Elite Looks offers high-quality haircuts and beard grooming — whether at the shop or at your home. Book your appointment today and experience elite care.
        </p>

        <HaircutCarousel />

        <Link href="/book" passHref>
          <Button
            size="lg"
            className="mt-10 bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg transition"
          >
            Book Now
          </Button>
        </Link>

        <Highlights />
        <FAQSection />
      </section>
    </>
  );
}

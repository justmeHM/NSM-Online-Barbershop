"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black relative overflow-hidden flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 text-white font-serif">
      
      {/* Floating Logo Watermark */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 select-none w-72 h-72">
        <Image
          src="/images/logo.jpg"
          alt="Logo watermark"
          width={288}
          height={288}
          className="object-contain rounded-full"
          priority
        />
      </div>

      {/* Left Content */}
      <motion.div
        className="z-10 max-w-xl text-center md:text-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight relative inline-block mb-6">
          NSM Elite Looks
          <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full animate-glow"></span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md">
          Experience premium grooming that redefines your style — book your transformation today, at the shop or at home.
        </p>

        <Link href="/book" passHref>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px 3px rgb(218 165 32 / 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 border-2 border-yellow-500 text-yellow-400 font-semibold rounded-lg tracking-wide transition-shadow"
          >
            Book Now
          </motion.a>
        </Link>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="relative w-full max-w-md mt-12 md:mt-0 md:ml-16 flex-shrink-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <Image
          src="/images/img1.jpg" // Replace with your best high-quality haircut image
          alt="Elite haircut"
          width={450}
          height={500}
          className="rounded-xl shadow-xl object-cover"
          priority
        />
      </motion.div>

      {/* Glow animation */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 8px 3px rgba(218, 165, 32, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 6px rgba(218, 165, 32, 1);
          }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

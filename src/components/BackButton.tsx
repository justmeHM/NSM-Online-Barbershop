"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      aria-label="Go back to previous page"
    >
      ← Back
    </button>
  );
}

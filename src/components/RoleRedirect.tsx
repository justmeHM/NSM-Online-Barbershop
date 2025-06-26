// src/components/RoleRedirect.tsx
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function RoleRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      if (!isLoaded || !user) return;

      const res = await fetch("/api/user-role");
      const data = await res.json();

      if (data.role === "admin") {
        router.replace("/admin");
      }
    };

    redirectUser();
  }, [isLoaded, user, router]);

  return null;
}

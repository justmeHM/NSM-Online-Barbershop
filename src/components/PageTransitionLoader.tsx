"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation";

export function PageTransitionLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <Loader2 className="w-12 h-12 animate-spin text-yellow-400" />
    </div>
  );
}

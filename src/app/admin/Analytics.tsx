"use client";

import dynamic from "next/dynamic";

const SignupChart = dynamic(() => import("@/components/SignupChart"), {
  ssr: false,
});

export default function AnalyticsSection({ data }: { data: { date: string; count: number }[] }) {
  return (
    <div className="mt-10">
      <SignupChart data={data} />
    </div>
  );
}

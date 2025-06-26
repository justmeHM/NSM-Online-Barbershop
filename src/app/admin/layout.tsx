import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  const adminEmails = ["harrison.mwewa@cs.unza.zm"];

  if (!user || !adminEmails.includes(user.emailAddresses?.[0]?.emailAddress || "")) {
    // Redirect to a custom unauthorized page or homepage
    return redirect("/unauthorized");
  }

  return (
    <>
      {/* You can add admin-specific navbars or wrappers here */}
      {children}
    </>
  );
}

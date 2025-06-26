import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match everything except static files & _next
    "/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|json|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import ModeToggle from "@/components/modeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NSM Elite Looks | Premium Barbershop",
  description:
    "Get top-tier haircuts and beard trims at the shop or in your home. Book today and feel elite.",
  keywords: ["barbershop", "haircut", "beard trim", "Lusaka", "premium grooming"],
  openGraph: {
    title: "NSM Elite Looks",
    description: "Experience premium grooming in Lusaka. Book online now.",
    images: ["/images/logo.jpg"],
    type: "website",
    locale: "en_US",
    url: "https://nsmelitelooks.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "NSM Elite Looks",
    description: "Premium haircuts and beard trims in Lusaka.",
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-black text-gray-200 min-h-screen font-sans`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

              
            {/* React Hot Toast Container */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#121212",
                  color: "#D4AF37",
                  fontWeight: "bold",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "#D4AF37",
                    secondary: "#121212",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ff4d4f",
                    secondary: "#121212",
                  },
                },
              }}
            />
            <Navbar /> {/* Navbar includes MobileSidebar */}
            <PageTransitionLoader />
          

            <main className="max-w-5xl mx-auto p-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

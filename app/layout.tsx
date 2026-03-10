import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Providers } from "@/components/providers";
import AppLayout from "@/components/app-layout";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Fesalice Enterprise - SIM Distribution System",
  description: "Advanced SIM card inventory and distribution management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-blue-100 selection:text-blue-900`}>
        <AuthProvider>
          <Providers>
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster position="top-right" richColors />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

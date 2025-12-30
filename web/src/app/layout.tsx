
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import styles from "./barang/barang.module.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className={styles.header}>
          <Image
            src={"/images/logo.png"}
            alt="Logo UTI"
            width={320}
            height={60}
            priority
          />
        </header>
        <main>{children}</main>
        {/* buat tag Toaster untuk Sonner */}
        <Toaster position="top-center" toastOptions={{
          style: {
            backgroundColor: "#333333",
            color: "#FFFFFF"
          }
        }} />
        <footer className={styles.footer}>&copy; 2025 - IF 23 FX</footer>
      </body>
    </html>
  );
}

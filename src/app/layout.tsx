import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileNavShell from "@/components/MobileNavShell";
import { ReflectiveProvider } from "@/context/ReflectiveContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Damian Izaguirre - Product Designer",
  description:
    "Product designer giving data life through meaningful design. Currently studying at The University of Texas at Dallas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ReflectiveProvider>
          <MobileNavShell />
          {children}
        </ReflectiveProvider>
      </body>
    </html>
  );
}

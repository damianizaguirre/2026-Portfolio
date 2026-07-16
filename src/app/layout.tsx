import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Damian Izaguirre",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f9f9f9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ReflectiveProvider>{children}</ReflectiveProvider>
      </body>
    </html>
  );
}

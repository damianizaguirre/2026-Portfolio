import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Damian Izaguirre | Portfolio",
  description: "Designing impactful products by giving life through meaningful design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

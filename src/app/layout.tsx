import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Players Liga",
  description: "Top scorer among your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[300px]`}>
        {/* <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main> */}
        <main className="m-auto  max-w-7xl p-4">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

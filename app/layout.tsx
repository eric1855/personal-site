import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Site",
  description: "Interactive 3D personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 overflow-hidden bg-black">
        {children}
      </body>
    </html>
  );
}

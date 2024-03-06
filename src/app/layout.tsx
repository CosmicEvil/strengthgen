import type { Metadata } from "next";
import "./styles/globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Header from '@/src/components/ui/Header';

export const metadata: Metadata = {
  title: "Strength Generation AI",
  description: "Your Artificial personal trainer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className="bg-gradient-to-br from-indigo-950 from-10% via-teal-900 via-70% to-fuchsia-700 ">
          <ConvexClientProvider>
            <Header />
            {children}
          </ConvexClientProvider>
        </body>
      </html>
  );
}

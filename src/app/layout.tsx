import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatAssistant from "@/components/ChatAssistant";

export const metadata: Metadata = {
  title: "Rajat | Software Engineer",
  description: "Building digital products, brands, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <LayoutWrapper>
            {children}
            <ChatAssistant />
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

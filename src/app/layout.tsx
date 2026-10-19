import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rajattripathi.dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rajat Tripathi | Senior Full-Stack Developer & AI Engineer",
    template: "%s | Rajat Tripathi",
  },
  description:
    "Senior Full-Stack Developer (8+ years) and AI Engineer specialized in React, Next.js, Node.js, Python, FastAPI, and LLM tooling. Building production-grade AI systems. Open to remote roles.",
  keywords: [
    "Rajat Tripathi",
    "Senior Full-Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Expert",
    "Python FastAPI",
    "LangChain",
    "LLM Applications",
    "RAG Architecture",
    "Full-Stack Portfolio",
    "Remote Software Engineer",
  ],
  authors: [{ name: "Rajat Tripathi", url: SITE_URL }],
  creator: "Rajat Tripathi",
  publisher: "Rajat Tripathi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rajat Tripathi Portfolio",
    title: "Rajat Tripathi | Senior Full-Stack Developer & AI Engineer",
    description:
      "Senior Full-Stack Developer (8+ years) and AI Engineer building production-grade web apps and intelligent AI products.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Rajat Tripathi - Senior Full-Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajat Tripathi | Senior Full-Stack Developer & AI Engineer",
    description:
      "Senior Full-Stack Developer (8+ years) and AI Engineer building production-grade web apps and intelligent AI products.",
    images: ["/profile.jpg"],
    creator: "@rajattripathi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Rajat Tripathi",
      jobTitle: "Senior Full-Stack Developer & AI Engineer",
      description:
        "Senior Full-Stack Developer with 8+ years experience building production applications with React, Next.js, Node.js, Python, FastAPI, and LLM tooling.",
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      sameAs: [
        "https://www.linkedin.com/in/rajat-tripathi-603b79108/",
        "https://github.com",
      ],
      knowsAbout: [
        "Full-Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "FastAPI",
        "Artificial Intelligence",
        "Large Language Models (LLMs)",
        "Retrieval-Augmented Generation (RAG)",
        "LangChain",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rajat Tripathi - Portfolio & Engineering Blog",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col font-sans antialiased selection:bg-orange-500/30 selection:text-orange-200`} 
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

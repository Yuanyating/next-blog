import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Blog - A Personal Blog",
    template: "%s | My Blog",
  },
  description: "A personal blog built with Next.js 14, TypeScript, and Tailwind CSS",
  keywords: ["blog", "nextjs", "typescript", "tailwind", "web development"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "My Blog",
    title: "My Blog",
    description: "A personal blog built with Next.js 14, TypeScript, and Tailwind CSS",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog",
    description: "A personal blog built with Next.js 14, TypeScript, and Tailwind CSS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

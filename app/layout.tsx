import type { Metadata } from "next";
import { Anton, Inter_Tight } from "next/font/google";
import Shell from "@/components/Shell";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Liliána Török — Product Designer",
  description:
    "Product designer from Budapest, turning complex problems into simple, usable digital products.",
};

// Dark by default; runs before paint so a saved light theme never flashes dark.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("theme")==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${anton.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

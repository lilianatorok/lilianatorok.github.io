import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import Shell from "@/components/Shell";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Liliána Török — Product Designer",
  description:
    "Product designer from Budapest, turning complex problems into simple, usable digital products.",
};

// Runs before paint so a saved dark theme never flashes light.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("theme")==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${archivo.variable} ${instrumentSerif.variable}`}
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

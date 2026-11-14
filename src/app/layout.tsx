import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import { disciplines } from "@/lib/services";
import "./globals.css";

const display = localFont({
  src: "../../public/fonts/sora-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 700",
});
const space = localFont({
  src: "../../public/fonts/space-grotesk-latin.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "400 700",
});
const mono = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono-regular-latin.woff2", weight: "400" },
    { path: "../../public/fonts/ibm-plex-mono-medium-latin.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "http://localhost:3000"),
  title: {
    default: "Vigilix | Intelligence. Precision. Defense.",
    template: "%s | Vigilix",
  },
  description: site.description,
  icons: { icon: "/brand/favicon.svg", apple: "/brand/apple-touch-icon.png" },
  robots: site.url
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#ffffff" };
const themeInitScript = `(function(){var t=null;try{t=localStorage.getItem("vigilix-theme")}catch(e){}if(t!=="dark"&&t!=="light"){try{t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){t="light"}}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#10151d":"#ffffff")})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${display.variable} ${space.variable} ${mono.variable}`}>
      <head>
        <script id="vigilix-theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header
          disciplines={disciplines.map(({ id, short, label, description, services }) => ({
            id,
            short,
            label,
            description,
            services: services.map(({ id, name }) => ({ id, name })),
          }))}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              description: site.description,
              ...(site.url
                ? { url: site.url, logo: `${site.url}/brand/logo-light.svg` }
                : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

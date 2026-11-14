import type { Metadata } from "next";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export const site = {
  name: "Vigilix",
  url: configuredUrl || undefined,
  description:
    "Precision-driven cybersecurity: penetration testing, security governance, and enterprise security technology deployment.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Our approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | Vigilix` },
    description,
    alternates: site.url ? { canonical: path } : undefined,
    openGraph: {
      title: `${title} | Vigilix`,
      description,
      type: "website",
      ...(site.url ? { url: `${site.url}${path}` } : {}),
      images: [
        {
          url: "/images/social.jpg",
          width: 1200,
          height: 630,
          alt: "Vigilix. Know your risks. Strengthen your defense.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Vigilix`,
      description,
      images: ["/images/social.jpg"],
    },
  };
}

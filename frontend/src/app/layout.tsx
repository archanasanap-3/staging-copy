import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from 'next-themes';
import GlobalWidgets from '@/components/straveda/GlobalWidgets';

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data for SEO                                   */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Straveda Tech",
      "url": "https://straveda.com",
      "logo": "https://straveda.com/logo.png",
      "description":
        "AI-powered business automation and custom software for mid-market companies in India.",
      "foundingDate": "2024",
      "foundingLocation": {
        "@type": "Place",
        "name": "Pune, Maharashtra, India"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "422001",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@straveda.com",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      },
      "sameAs": [
        "https://linkedin.com/company/straveda",
        "https://twitter.com/straveda",
        "https://github.com/straveda"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Straveda",
      "url": "https://straveda.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://straveda.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does a typical engagement cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Engagements start at ₹5L for focused automation builds. Custom software and AI integrations run ₹15L–₹50L depending on scope. Fixed-price quotes after a discovery call — no hourly billing."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most projects ship their first working deployment in 4–6 weeks. We don't do 6-month black-box builds."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with our existing team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We integrate with your in-house developers, ops team, or IT partner. Either way, we document ruthlessly so knowledge doesn't live in our heads."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Straveda different from other agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Three things: (1) Priced for mid-market, not enterprise. (2) We ship weekly, not quarterly. (3) We automate before we build. Full code ownership, zero vendor lock-in."
          }
        },
        {
          "@type": "Question",
          "name": "Can you handle enterprise-scale deployments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We build scale-ready architecture from day one and are sized for mid-market execution — ideal for 50–500 person companies that need to move fast."
          }
        },
        {
          "@type": "Question",
          "name": "How do we get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Book a 30-minute strategy call. You'll walk away with a working hypothesis for what to automate first. If it's a fit, we send a proposal within 48 hours."
          }
        }
      ]
    },
    {
      "@type": "Service",
      "name": "AI & Business Automation",
      "provider": { "@type": "Organization", "name": "Straveda Tech" },
      "description":
        "WhatsApp flows, email sequences, AI support agents, and workflow automation that removes 30–60% of manual operations in the first quarter.",
      "areaServed": "India"
    },
    {
      "@type": "Service",
      "name": "Custom Software & Systems",
      "provider": { "@type": "Organization", "name": "Straveda Tech" },
      "description":
        "AI-powered CRMs, real-time dashboards, and internal tools built around your workflow with zero subscription bloat.",
      "areaServed": "India"
    },
    {
      "@type": "Service",
      "name": "AI Strategy & Integration",
      "provider": { "@type": "Organization", "name": "Straveda Tech" },
      "description":
        "Deploy GPT-class models, vision APIs, and custom LLMs directly into your operations stack.",
      "areaServed": "India"
    },
    {
      "@type": "Service",
      "name": "Web Development & 3D Experiences",
      "provider": { "@type": "Organization", "name": "Straveda Tech" },
      "description":
        "High-performance Next.js websites, 3D interactive experiences, and conversion-optimised landing pages deployed to edge.",
      "areaServed": "India"
    },
    {
      "@type": "Service",
      "name": "Brand & Experience Layer",
      "provider": { "@type": "Organization", "name": "Straveda Tech" },
      "description":
        "UI/UX design that converts leads into clients. Engaging web design and product interfaces that connect with your audience. Cohesive digital and design strategy for high-performance systems. Strategic digital and design layers integrated within 90 days.",
      "serviceType": "Digital & Design",
      "areaServed": "India"
    }
  ]
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Straveda Tech — AI Automation & Custom Software for Mid-Market India",
  description:
    "AI-powered business automation and custom software for growing companies in India. WhatsApp automation, AI CRMs, intelligent workflows. Engagements from ₹5L. Based in Pune.",
  keywords: [
    "Straveda",
    "AI automation India",
    "business automation",
    "custom software development India",
    "WhatsApp automation",
    "AI CRM",
    "mid-market software",
    "workflow automation",
    "AI integration",
    "Pune tech company",
  ],
  authors: [{ name: "Straveda Tech", url: "https://straveda.com" }],
  openGraph: {
    title: "Straveda Tech — AI Automation & Custom Software for Mid-Market India",
    description:
      "AI-powered business automation and custom software for growing companies in India. Engagements from ₹5L. Based in Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Straveda Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Straveda Tech AI Automation & Custom Software for Mid Market India",
    description:
      "AI-powered business automation and custom software for growing companies in India. Engagements from ₹5L. Based in Pune.",
  },
  alternates: {
    canonical: "https://straveda.com"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <GlobalWidgets />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

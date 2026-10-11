"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  ArrowRight,
  Smartphone,
  BarChart3,
  Warehouse,
  Box,
  Check,
  ClipboardList,
  CreditCard,
  Heart,
  LayoutDashboard,
  Megaphone,
  Package,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Layers,
  Store,
  Truck,
  Users,
  Settings,
  Bot as BotIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const commerceModules = [
  {
    title: "Premium Online Store",
    label: "FOUNDATION",
    points: [
      "Fully Custom UI",
      "Responsive Design",
      "Lightning Fast",
      "SEO Ready",
    ],
  },
  {
    title: "Product Management",
    label: "CATALOG",
    points: [
      "Unlimited Products",
      "Categories",
      "Variants",
      "Collections",
    ],
  },
  {
    title: "Customer Experience",
    label: "CUSTOMER",
    points: ["Wishlist", "Reviews", "Coupons", "Loyalty"],
  },
  {
    title: "Multiple Payment Options",
    label: "PAYMENTS",
    points: [
      "UPI · Cards · Net Banking",
      "Wallets · COD",
      "International",
      "Secure Gateways",
    ],
  },
  {
    title: "Order Management",
    label: "ORDERS",
    points: [
      "Order Processing",
      "Order Tracking",
      "Returns",
      "Refunds",
    ],
  },
  {
    title: "Inventory Management",
    label: "INVENTORY",
    points: [
      "Real-Time Stock",
      "Low Stock Alerts",
      "Warehouse Support",
      "Multi-location",
    ],
  },
  {
    title: "Shipment Management",
    label: "NATIVE INTEGRATIONS",
    points: [
      "Shiprocket Integration",
      "Shipmozo Integration",
      "Delivery Tracking",
      "Shipping Labels · AWB Generation",
    ],
  },
];

const advancedModules = [
  {
    no: "01 / 05",
    title: "Business Analytics",
    icon: BarChart3,
    tag: "LIVE DASHBOARD",
    items: [
      "Revenue Dashboard",
      "Sales Reports",
      "Customer Insights",
      "Profit Tracking",
    ],
  },
  {
    no: "02 / 05",
    title: "Marketing Intelligence",
    icon: Megaphone,
    tag: "ROI-TRACKED",
    items: [
      "Google Ads Integration",
      "Meta Ads Integration",
      "Campaign Performance",
      "ROI Dashboard",
    ],
  },
  {
    no: "03 / 05",
    title: "CRM & Lead Management",
    icon: Users,
    tag: "360° VIEW",
    items: [
      "Customer Database",
      "Lead Tracking",
      "Follow-ups",
      "Customer History",
    ],
  },
  {
    no: "04 / 05",
    title: "Omnichannel Commerce",
    icon: LayoutDashboard,
    tag: "CONNECTED",
    items: [
      "Website",
      "Mobile App",
      "WhatsApp Integration",
      "Email + SMS Alerts",
    ],
  },
  {
    no: "05 / 05",
    title: "AI & Automation",
    icon: Sparkles,
    tag: "AUTOMATED",
    items: [
      "Automated Notifications",
      "Smart Reports",
      "AI Recommendations",
      "Workflow Automation",
    ],
  },
];

const workflow = [
  ["01", "Customer"],
  ["02", "Browse Products"],
  ["03", "Add to Cart"],
  ["04", "Secure Checkout"],
  ["05", "Payment"],
  ["06", "Order Management"],
  ["07", "Inventory Update"],
  ["08", "Shipment Integration"],
  ["09", "Order Tracking"],
  ["10", "Delivery"],
  ["11", "Invoice"],
  ["12", "Business Analytics"],
  ["13", "Marketing Intelligence"],
  ["14", "Customer Retention"],
];

const oldWay = [
  "Basic Store",
  "Limited Reporting",
  "Separate Marketing Tools",
  "Manual Order Processing",
  "Third-party Integrations",
  "Multiple Software",
];

const stravedaWay = [
  "Premium Custom Store",
  "Business Analytics",
  "Marketing Intelligence",
  "Shipment Management",
  "Inventory Management",
  "CRM & Customer Tracking",
  "AI Automation",
  "Complete Business Workflow",
  "Built Around Your Business",
];

const finalFeatures = [
  "Premium Custom eCommerce Website",
  "Product & Customer Experience",
  "Secure Payments & Checkout",
  "Order Management",
  "Inventory Management",
  "Shipment Integration",
  "Business Analytics Dashboard",
  "Marketing Intelligence",
  "CRM & Lead Management",
  "AI Automation & Custom Admin Panel",
];

const featureDescriptions: Record<string, string> = {
  "Premium Custom eCommerce Website":
    "fully custom UI, mobile-responsive design, fast performance, SEO readiness, and a premium brand experience",

  "Product & Customer Experience":
    "unlimited products, categories, variants, collections, wishlist, reviews, coupons, and loyalty features",

  "Secure Payments & Checkout":
    "UPI, cards, net banking, wallets, cash on delivery, international payments, and secure payment gateways",

  "Order Management":
    "order processing, order tracking, returns, refunds, and streamlined order workflows",

  "Inventory Management":
    "real-time stock updates, low-stock alerts, warehouse support, and multi-location inventory",

  "Shipment Integration":
    "Shiprocket and Shipmozo integration, delivery tracking, shipping labels, and AWB generation",

  "Business Analytics Dashboard":
    "real-time revenue tracking, sales reports, customer insights, profit tracking, and smart reporting",

  "Marketing Intelligence":
    "Google Ads and Meta Ads integration, campaign performance tracking, conversion insights, and ROI reporting",

  "CRM & Lead Management":
    "customer database, lead tracking, follow-ups, customer history, and customer retention workflows",

  "AI Automation & Custom Admin Panel":
    "AI recommendations, automated notifications, workflow automation, and a unified admin panel for business operations",
};

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
      {children}
    </p>
  );
}

function ModuleCard({
  module,
}: {
  module: {
    no: string;
    title: string;
    icon: React.ComponentType<{ size?: number }>;
    items: string[];
  };
}) {
  return (
    <div className="flex items-start gap-4 py-5">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]/40 bg-white dark:bg-[#12121e]">
        <Check size={15} className="text-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-black dark:text-white">
          {module.title}
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#FF4800]">
          {module.items.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AdvancedCard({
  module,
}: {
  module: (typeof advancedModules)[number];
}) {
  return (
    <div className="flex items-start gap-4 py-5">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]/40 bg-white dark:bg-[#12121e]">
        <Check size={15} className="text-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-black dark:text-white">
          {module.title}
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#FF4800]">
          {module.items.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CommerceOSPage() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
  const [completedModules, setCompletedModules] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || interval) return;

        interval = setInterval(() => {
          setCompletedModules((current) => {
            if (current >= commerceModules.length) {
              if (interval) clearInterval(interval);
              return current;
            }

            return current + 1;
          });
        }, 900);

        observer.unobserve(section);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  const totalSteps = 14;
  const duration = 14000; // 14 seconds

  useEffect(() => {
    const stepTime = duration / totalSteps;

    const interval = setInterval(() => {
      setActiveWorkflowStep((prev) =>
        prev >= totalSteps ? 1 : prev + 1
      );
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="overflow-hidden bg-[#F6F1E7] text-black dark:text-white dark:bg-[#0a0a14] dark:text-white">

      {/* =========================================================
          01 — HERO
      ========================================================= */}

      <section className="relative overflow-hidden pt-32 lg:pt-36">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
        </div>

        <div className="relative mx-auto grid max-w-7xl lg:items-stretch gap-10 px-4 pt-4 pb-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">

          {/* LEFT CONTENT */}
          <div className="relative z-20 flex flex-col pt-1 lg:pt-2">

            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
              Premium Commerce Platform
            </p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-bold text-left mb-8 text-black dark:text-white tracking-tight"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                maxWidth: "680px",
              }}
            >
              Custom Ecommerce 
              Solutions More Than<br />
              an{" "}
              <span style={{ color: "#FF4800" }}>
                Online Store
              </span>
            </motion.h1>

            <p className="mt-4 max-w-xl text-lg font-medium leading-8 text-neutral-700 dark:text-neutral-300">
              A Complete Commerce & Business Platform
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
              Premium custom-built eCommerce websites with integrated
              business operations, marketing intelligence, AI insights,
              and enterprise workflows.
            </p>

            <div className="mt-9 grid max-w-xl grid-cols-3">
              <div className="py-5 pr-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
                  Platform
                </p>
                <p className="mt-2 text-sm font-bold">
                  Commerce OS
                </p>
                <p className="mt-1 text-[10px] text-neutral-600 dark:text-neutral-400">
                  Operating system
                </p>
              </div>

              <div className="px-5 py-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
                  Modules
                </p>
                <p className="mt-2 text-sm font-bold">
                  12+ Built-in
                </p>
                <p className="mt-1 text-[10px] text-neutral-600 dark:text-neutral-400">
                  Native integrations
                </p>
              </div>

              <div className="py-5 pl-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
                  Brand
                </p>
                <p className="mt-2 text-sm font-bold">
                  Straveda
                </p>
                <p className="mt-1 text-[10px] text-neutral-600 dark:text-neutral-400">
                  Premium commerce
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative min-h-[650px] lg:min-h-[640px]">
            {/* Ambient glow */}
            <div className="absolute right-[8%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#FF4800]/10 blur-[100px]" />

            {/* Orbit */}
            <div className="absolute right-[3%] top-[2%] h-[520px] w-[520px] rounded-full border border-[#FF4800]/10" />
            <div className="absolute right-[12%] top-[11%] h-[360px] w-[360px] rounded-full border border-[#FF4800]/10" />

            {/* MAIN DASHBOARD */}
            <div className="commerce-dashboard absolute right-[2%] top-0 z-20 w-[88%] max-w-[610px] rounded-[28px] border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] p-3">
              <div className="rounded-[21px] border border-[#0f172a]/10 dark:border-white/10 bg-[#f8fafc] dark:bg-[#0d0d18] p-4">
                {/* Browser header */}
                <div className="flex items-center justify-between border-b border-[#0f172a]/10 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-3 text-[9px] text-[#94a3b8]">
                      Straveda Commerce OS
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[8px] font-bold text-[#FF4800]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4800]" />
                    LIVE
                  </span>
                </div>

                {/* Dashboard title */}
                <div className="mt-5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#94a3b8]">
                    Commerce Intelligence
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold">
                      Dashboard Overview
                    </h3>
                    <span className="rounded-lg border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] px-3 py-1.5 text-[8px] text-neutral-600 dark:text-neutral-400">
                      This Month
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ["TOTAL REVENUE", "₹4.2L", "+18.4%"],
                    ["TOTAL ORDERS", "1,284", "+12.8%"],
                    ["CUSTOMERS", "5.6K", "+9.2%"],
                  ].map(([label, value, change]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] p-3.5"
                    >
                      <p className="text-[7px] font-bold tracking-wider text-[#94a3b8]">
                        {label}
                      </p>
                      <p className="mt-2 text-lg font-bold text-black dark:text-white">
                        {value}
                      </p>
                      <p className="mt-1 text-[8px] font-semibold text-green-600">
                        ↑ {change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Graph + Orders */}
                <div className="mt-4 grid gap-3 md:grid-cols-[1.45fr_1fr]">
                  {/* Revenue graph */}
                  <div className="rounded-xl border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        Revenue Performance
                      </p>
                      <span className="text-[8px] text-[#94a3b8]">
                        +18.4%
                      </span>
                    </div>

                    <div className="mt-6 flex h-32 items-end gap-2">
                      {[32, 44, 38, 55, 48, 70, 64, 83, 76, 94, 87].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="commerce-bar flex-1 rounded-t-sm bg-[#FF4800]/70"
                            style={{
                              height: `${height}%`,
                              animationDelay: `${index * 80}ms`,
                            }}
                          />
                        )
                      )}
                    </div>

                    <div className="mt-3 flex justify-between text-[7px] text-[#94a3b8]">
                      <span>JAN</span>
                      <span>FEB</span>
                      <span>MAR</span>
                      <span>APR</span>
                      <span>MAY</span>
                    </div>
                  </div>

                  {/* Live Orders */}
                  <div className="rounded-xl border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        Live Orders
                      </p>
                      <ShoppingCart
                        size={13}
                        className="text-[#FF4800]"
                      />
                    </div>

                    <div className="mt-5 space-y-4">
                      {[
                        ["#4827", "Shipped"],
                        ["#4831", "Packing"],
                        ["#4827193", "In Transit"],
                      ].map(([order, status]) => (
                        <div
                          key={order}
                          className="flex items-center justify-between text-[9px]"
                        >
                          <span className="font-medium">
                            {order}
                          </span>
                          <span
                            className={
                              status === "Shipped"
                                ? "text-green-600"
                                : status === "Packing"
                                  ? "text-[#FF4800]"
                                  : "text-neutral-600 dark:text-neutral-400"
                            }
                          >
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-lg bg-[#fff7f2] dark:bg-[#FF4800]/10 p-3">
                      <div className="flex items-center gap-2">
                        <Truck
                          size={13}
                          className="text-[#FF4800]"
                        />
                        <span className="text-[8px] font-bold">
                          Shipment Tracking
                        </span>
                      </div>
                      <div className="mt-3 h-1 rounded-full bg-[#e2e8f0] dark:bg-white/15">
                        <div className="h-1 w-[76%] rounded-full bg-[#FF4800]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Modules */}
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    ["CRM", Users],
                    ["Inventory", Package],
                    ["Marketing", Megaphone],
                    ["AI", Sparkles],
                  ].map(([label, Icon]) => {
                    const ModuleIcon = Icon as typeof Sparkles;
                    return (
                      <div
                        key={String(label)}
                        className="rounded-lg border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] px-2 py-3"
                      >
                        <ModuleIcon
                          size={12}
                          className="text-[#FF4800]"
                        />
                        <p className="mt-2 text-[7px] font-semibold text-neutral-600 dark:text-neutral-400">
                          {String(label)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FLOATING NEW ORDER */}
            <div className="commerce-float-order absolute right-[-8%] top-[-2%] z-20 w-[190px] rounded-2xl border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF4800]/10">
                    <ShoppingBag
                      size={13}
                      className="text-[#FF4800]"
                    />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold">
                      New Order
                    </p>
                    <p className="text-[7px] text-[#94a3b8]">
                      Just now
                    </p>
                  </div>
                </div>
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[7px] text-[#94a3b8]">
                    ORDER VALUE
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    ₹8,490
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#FF4800]"
                />
              </div>
            </div>

            {/* FLOATING SHIPMENT CARD */}
            <div className="commerce-float-shipment absolute bottom-[3%] left-[-8%] z-40 w-[220px] rounded-2xl border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-[#12121e] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0e8] dark:bg-[#FF4800]/10">
                  <Truck
                    size={16}
                    className="text-[#FF4800]"
                  />
                </div>
                <div>
                  <p className="text-[8px] font-bold">
                    Shipment Tracking
                  </p>
                  <p className="text-[7px] text-[#94a3b8]">
                    Order #4827193
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className="flex flex-1 items-center"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        step <= 3
                          ? "bg-[#FF4800]"
                          : "bg-[#cbd5e1] dark:bg-white/20"
                      }`}
                    />
                    {step !== 4 && (
                      <span
                        className={`h-[2px] flex-1 ${
                          step < 3
                            ? "bg-[#FF4800]"
                            : "bg-[#cbd5e1] dark:bg-white/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between text-[7px] text-[#94a3b8]">
                <span>Order</span>
                <span>Packed</span>
                <span>Transit</span>
                <span>Delivered</span>
              </div>
            </div>

            {/* SMART WATCH */}
            <div className="commerce-watch absolute bottom-[-2%] right-[4%] z-40">
              <div className="absolute left-1/2 top-[-30px] h-[90px] w-[58px] -translate-x-1/2 rounded-[25px] bg-[#e2e8f0] dark:bg-white/15" />
              <div className="absolute bottom-[-30px] left-1/2 h-[90px] w-[58px] -translate-x-1/2 rounded-[25px] bg-[#e2e8f0] dark:bg-white/15" />

              <div className="relative flex h-[150px] w-[125px] rotate-[8deg] items-center justify-center rounded-[35px] border-[5px] border-[#cbd5e1] dark:border-white/20 bg-white dark:bg-[#12121e] shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                <div className="flex h-[116px] w-[94px] flex-col items-center justify-center rounded-[25px] bg-[#fffaf8] dark:bg-[#FF4800]/10">
                  <p className="text-[7px] font-bold uppercase tracking-widest text-[#94a3b8]">
                    COMMERCE OS
                  </p>
                  <p className="mt-2 text-xl font-bold text-black dark:text-white">
                    ₹42.8K
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[7px] font-bold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    +18.4%
                  </div>

                  <div className="mt-3 flex h-6 items-end gap-1">
                    {[7, 12, 9, 18, 15, 22].map(
                      (height, index) => (
                        <span
                          key={index}
                          className="w-2 rounded-t-sm bg-[#FF4800]"
                          style={{ height }}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="absolute right-[-10px] top-[48px] h-7 w-3 rounded-r-md bg-[#94a3b8]" />
              </div>
            </div>
          </div>
        </div>

        {/* HERO ANIMATIONS */}
        <style jsx>{`
          .commerce-dashboard {
            animation: dashboardFloat 6s ease-in-out infinite;
            transform-origin: center;
          }
          .commerce-float-order {
            animation: orderFloat 4s ease-in-out infinite;
          }
          .commerce-float-shipment {
            animation: shipmentFloat 5s ease-in-out infinite;
          }
          .commerce-watch {
            animation: watchFloat 5s ease-in-out infinite;
          }
          .commerce-bar {
            animation: barPulse 3s ease-in-out infinite alternate;
            transform-origin: bottom;
          }
          @keyframes dashboardFloat {
            0%, 100% { transform: translateY(0px) rotate(1deg); }
            50% { transform: translateY(-10px) rotate(0.5deg); }
          }
          @keyframes orderFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes shipmentFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(10px); }
          }
          @keyframes watchFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          @keyframes barPulse {
            from { transform: scaleY(0.94); opacity: 0.7; }
            to { transform: scaleY(1); opacity: 1; }
          }
          @media (max-width: 1024px) {
            .commerce-watch { right: 5%; bottom: 2%; transform: scale(0.85); }
            .commerce-float-order { right: 0; }
            .commerce-float-shipment { left: 0; }
          }
          @media (max-width: 640px) {
            .commerce-dashboard { position: relative; right: auto; top: auto; width: 100%; }
            .commerce-float-order { right: -5px; top: 40%; transform: scale(0.8); }
            .commerce-float-shipment { left: -5px; bottom: 12%; transform: scale(0.8); }
            .commerce-watch { right: 3%; bottom: 0; transform: scale(0.65); }
          }
        `}</style>
      </section>

      {/* COMMERCE MODULES */}
      <section className="hidden bg-[#F6F1E7] py-12 dark:bg-[#0a0a14] md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-12">
            <span className="mb-4 block px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF4800]">
              COMMERCE MODULES
            </span>

            <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]">
              Everything Your Online Business Needs
            </h2>

            <p className="mt-4 max-w-5xl text-base leading-relaxed text-[#64748B] dark:text-slate-400 md:text-lg">
              Seven integrated modules power the entire Straveda Commerce OS —
              from storefront to shipment.
            </p>
          </div>

          <div
            ref={sectionRef}
            className="grid grid-cols-1 gap-x-12 md:grid-cols-2"
          >
            {[commerceModules.slice(0, 4), commerceModules.slice(4)].map(
              (column, columnIndex) => (
                <div key={columnIndex} className="relative">
                  {column.map((module) => {
                    const index = commerceModules.indexOf(module);
                    const isCompleted = index < completedModules;
                    const isLastInColumn =
                      index === (columnIndex === 0 ? 3 : 6);

                    return (
                      <div key={module.title} className="relative">
                        <div className="flex gap-4 py-6 sm:gap-5">
                          <div className="relative flex shrink-0 flex-col items-center">
                            <div
                              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                                isCompleted
                                  ? "border-green-600 bg-green-600 text-white"
                                  : "border-[#FF4800]/40 bg-white dark:bg-[#12121e] text-transparent"
                              }`}
                            >
                              <Check
                                size={16}
                                strokeWidth={2.5}
                                className={`transition-all duration-300 ${
                                  isCompleted
                                    ? "scale-100 opacity-100"
                                    : "scale-50 opacity-0"
                                }`}
                              />
                            </div>

                            {!isLastInColumn && (
                              <div className="absolute left-1/2 top-8 bottom-[-25px] w-px -translate-x-1/2 bg-[#111827]">
                                <div
                                  className={`w-full bg-[#111827] transition-all duration-700 ${
                                    isCompleted ? "h-full" : "h-0"
                                  }`}
                                />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1 pb-1">
                            <h3 className="text-lg font-bold leading-tight text-black dark:text-white md:text-xl">
                              {module.title}
                            </h3>

                            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#FF4800]">
                              {module.points.map((point) => (
                                <li
                                  key={point}
                                  className="text-[14px] leading-relaxed text-[#64748B] dark:text-slate-400"
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {!isLastInColumn && (
                          <div className="h-px w-full bg-[#E2E8F0]/70 dark:bg-white/10" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          04 — COMPLETE BUSINESS WORKFLOW
      ========================================================= */}

      <section className="bg-[#F6F1E7] py-12 dark:bg-[#0a0a14] md:py-16">
        <div className="-mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>
              Connected Journey
            </SectionLabel>

            <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]">
              Complete Business Workflow
            </h2>

            <p className="mt-6 max-w-none lg:whitespace-nowrap text-base leading-7 text-neutral-600 dark:text-neutral-400">
              Every customer journey — from first click to retention — flows through one connected Straveda Commerce OS pipeline.
            </p>
          </div>

          <div className="mt-14">
            <div className="workflow-stepper">
              <div
                className="workflow-path"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 1000 300"
                  preserveAspectRatio="none"
                  className="workflow-path-svg"
                >
                  <path
                    d="M 40 75 H 960 V 225 H 40"
                    fill="none"
                    stroke="#FF4800"
                    strokeWidth="2"
                    opacity="0.35"
                  />
                </svg>
              </div>

              {/* TOP ROW — 01 TO 07 */}
              <div className="workflow-stepper-row workflow-row-top">
                {workflow.slice(0, 7).map(([number, title], index) => (
                  <div
                    className="workflow-step-wrap"
                    key={number}
                  >
                    <div
                      className={`workflow-step ${
                        activeWorkflowStep === Number(number)
                          ? "workflow-active"
                          : ""
                      }`}
                    >
                      <span className="workflow-step-number">
                        {String(number).padStart(2, "0")}
                      </span>

                      <div className="workflow-step-icon">
                        {index === 0 && <Store size={22} />}
                        {index === 1 && <ShoppingCart size={22} />}
                        {index === 2 && <CreditCard size={22} />}
                        {index === 3 && <Check size={22} />}
                        {index === 4 && <ClipboardList size={22} />}
                        {index === 5 && <Package size={22} />}
                        {index === 6 && <Truck size={22} />}
                      </div>

                      <div className="workflow-step-content">
                        <p className="text-sm font-semibold text-black dark:text-white">
                          {title}
                        </p>
                        <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                          Customer Journey
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM ROW — 14 TO 08 */}
              <div className="workflow-stepper-row workflow-row-bottom">
                {workflow.slice(7).reverse().map(([number, title], index) => (
                  <div
                    className="workflow-step-wrap"
                    key={number}
                  >
                    <div
                      className={`workflow-step ${
                        activeWorkflowStep === Number(number)
                          ? "workflow-active"
                          : ""
                      }`}
                    >
                      <span className="workflow-step-number">
                        {String(number).padStart(2, "0")}
                      </span>

                      <div className="workflow-step-icon">
                        {index === 0 && <Users size={22} />}
                        {index === 1 && <Megaphone size={22} />}
                        {index === 2 && <BarChart3 size={22} />}
                        {index === 3 && <ClipboardList size={22} />}
                        {index === 4 && <Truck size={22} />}
                        {index === 5 && <Package size={22} />}
                        {index === 6 && <RefreshCw size={22} />}
                      </div>

                      <div className="workflow-step-content">
                        <p className="text-sm font-semibold text-black dark:text-white">
                          {title}
                        </p>
                        <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                          Business Loop
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style jsx>{`
              .workflow-stepper {
                width: 100%;
                position: relative;
                padding: 20px 0;
              }
              .workflow-path {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                pointer-events: none;
              }
              .workflow-path-svg {
                width: 100%;
                height: 100%;
                display: block;
                overflow: visible;
              }
              .workflow-stepper-row {
                position: relative;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
              }
              .workflow-row-top {
                margin-bottom: 75px;
              }
              .workflow-row-bottom {
                margin-top: 0;
              }
              .workflow-step-wrap {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1 1 0;
                min-width: 0;
              }
              .workflow-step {
                position: relative;
                width: 150px;
                min-height: 145px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 18px 12px;
                background: rgba(255, 255, 255, 0.95);
                border: 1px solid rgba(255, 72, 0, 0.15);
                border-radius: 22px;
                box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
                transition:
                  transform 0.35s ease,
                  border-color 0.35s ease,
                  box-shadow 0.35s ease,
                  background 0.35s ease;
              }
              .workflow-step:hover {
                transform: translateY(-8px);
                border-color: #ff4800;
                background: #F6F1E7;
                box-shadow: 0 18px 40px rgba(255, 72, 0, 0.14);
              }
              .workflow-active {
                border-color: #ff4800;
                background: #fff7f2;
                box-shadow: 0 18px 45px rgba(255, 72, 0, 0.18);
                transform: translateY(-6px);
              }
              .workflow-step-number {
                position: absolute;
                top: -13px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: #fff3eb;
                border: 1px solid #ff4800;
                color: #ff4800;
                font-size: 9px;
                font-weight: 700;
                transition: all 0.3s ease;
              }
              .workflow-step:hover .workflow-step-number,
              .workflow-active .workflow-step-number {
                background: #ff4800;
                color: white;
              }
              .workflow-step-icon {
                width: 58px;
                height: 58px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 12px;
                border-radius: 50%;
                background: #fff3eb;
                color: #ff4800;
                box-shadow: 0 8px 20px rgba(255, 72, 0, 0.1);
                transition:
                  transform 0.35s ease,
                  background 0.35s ease,
                  color 0.35s ease;
              }
              .workflow-step:hover .workflow-step-icon,
              .workflow-active .workflow-step-icon {
                transform: scale(1.08);
                background: #ff4800;
                color: white;
              }
              :global(.dark) .workflow-step {
                background: rgba(18, 18, 30, 0.95);
                border-color: rgba(255, 72, 0, 0.25);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
              }
              :global(.dark) .workflow-step:hover,
              :global(.dark) .workflow-active {
                background: #1f1812;
                box-shadow: 0 18px 40px rgba(255, 72, 0, 0.2);
              }
              :global(.dark) .workflow-step-number,
              :global(.dark) .workflow-step-icon {
                background: rgba(255, 72, 0, 0.14);
              }
              :global(.dark) .workflow-step:hover .workflow-step-number,
              :global(.dark) .workflow-active .workflow-step-number,
              :global(.dark) .workflow-step:hover .workflow-step-icon,
              :global(.dark) .workflow-active .workflow-step-icon {
                background: #ff4800;
              }
              .workflow-step-content {
                text-align: center;
                max-width: 120px;
              }
              .workflow-step-content p:first-child {
                line-height: 1.25;
              }
              @media (max-width: 900px) {
                .workflow-path {
                  display: none;
                }
                .workflow-stepper-row {
                  display: grid;
                  grid-template-columns: repeat(2, minmax(0, 1fr));
                  gap: 45px 18px;
                }
                .workflow-row-top {
                  margin-bottom: 45px;
                }
                .workflow-step {
                  width: 100%;
                  min-height: 135px;
                }
              }
              @media (max-width: 640px) {
                .workflow-stepper-row {
                  grid-template-columns: 1fr;
                  gap: 40px;
                }
                .workflow-row-top {
                  margin-bottom: 40px;
                }
                .workflow-step {
                  max-width: 240px;
                  margin: 0 auto;
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* =========================================================
          05 — STRAVEDA ADVANTAGE
      ========================================================= */}

      <section className="bg-[#F6F1E7] py-12 dark:bg-[#0a0a14] md:py-16">
        <div className="-mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>
               The Straveda Advantage
            </SectionLabel>

            <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2] mx-auto">
              Why Business Choose Straveda
            </h2>
            <p className="mt-6 text-base leading-7 text-neutral-600 dark:text-neutral-400 lg:whitespace-nowrap">
              A side-by-side reality check on what changes when you move from stitched-together tools to one unified Commerce OS.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-5 lg:mx-auto lg:max-w-4xl lg:grid-cols-2">
            {/* THE OLD WAY — light card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl bg-[#EADFCB] p-6 text-[#14110c] sm:p-7"
            >
              <Layers size={28} strokeWidth={1.5} className="text-[#14110c]/80" />

              <h3 className="mt-5 text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                Traditional
                <br />
                eCommerce
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#14110c]/65">
                The old way of running an online store: many separate tools that never quite work together.
              </p>

              <ul className="mt-5 flex-1 space-y-2">
                {oldWay.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#14110c]/75">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14110c]/10 text-xs leading-none">
                      ×
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex w-fit items-center rounded-full bg-[#14110c] px-5 py-2.5 text-[13px] font-semibold text-[#F6F1E7]">
                6+ tools · fragmented ops
              </span>
            </motion.div>

            {/* THE STRAVEDA WAY — dark card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl bg-[#14110c] p-6 text-[#F6F1E7] dark:bg-[#1a1a28] dark:ring-1 dark:ring-white/10 sm:p-7"
            >
              <Sparkles size={28} strokeWidth={1.5} className="text-[#FF4800]" />

              <h3 className="mt-5 text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                Straveda
                <br />
                Commerce Platform
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#F6F1E7]/65">
                One unified Commerce OS that runs your store, your operations and your growth from a single dashboard.
              </p>

              <ul className="mt-5 flex-1 space-y-2">
                {stravedaWay.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#F6F1E7]/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4800] text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit items-center rounded-full bg-[#F6F1E7] px-5 py-2.5 text-[13px] font-semibold text-[#14110c] transition-colors hover:bg-[#FF4800] hover:text-white"
              >
                1 platform · Get started
              </Link>
            </motion.div>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
            <span>One Platform.</span>
            <span className="text-[#FF4800]">•</span>
            <span>One Dashboard.</span>
            <span className="text-[#FF4800]">•</span>
            <span>Complete Business Control.</span>
          </div>
        </div>
      </section>

            {/* =========================================================
          06 — FINAL CTA (ANIMATED WITH FRAMER MOTION)
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#F6F1E7] py-12 dark:bg-[#0a0a14] md:py-16">

        {/* EXACT ORIGINAL CONTAINER — No padding or position changes */}
        <div className="-mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionLabel>
            Your Commerce Partner
          </SectionLabel>

          <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2] mx-auto">
            Premium eCommerce, Built to Scale
          </h2>

          {/* Features: open, divider-led list (no boxes) */}
          <div className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-2">
            {finalFeatures.slice(0, 10).map((feature, idx) => {
              const number = String(idx + 1).padStart(2, '0');
              const rawDesc = featureDescriptions[feature] || 'premium commerce solution built around your business';
              const cleanDesc = rawDesc.replace(/^\(/, '').replace(/\)$/, '');

              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (idx % 5) * 0.07 }}
                  className="group flex cursor-default items-start gap-6 py-5"
                >
                  <span className="w-[4.25rem] shrink-0 text-[2.75rem] font-bold leading-[0.9] tracking-tighter text-[#FF4800]/25 transition-colors duration-300 group-hover:text-[#FF4800]">
                    {number}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold tracking-tight text-black dark:text-white sm:text-xl">
                      {feature}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {cleanDesc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA Banner with Motion Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="group/banner mt-14 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800 hover:border-[#FF4800]/30 transition-all duration-300"
          >
            <div className="text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                Ready to build your next-gen eCommerce store?
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Book a discovery call and receive a custom architecture roadmap.
              </p>
            </div>

            <Link
              href="/contact"
              className="group/btn shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF4800] to-amber-500 text-white font-semibold text-sm hover:opacity-95 shadow-lg shadow-[#FF4800]/25 active:scale-95 transition-all"
            >
              <span>Start a project</span>
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
            </Link>
          </motion.div>

        </div>

      </section>

    </main>
  );
}
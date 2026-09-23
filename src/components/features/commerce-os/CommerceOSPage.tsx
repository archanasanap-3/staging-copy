"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
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
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const coreModules = [
  {
    no: "01",
    title: "Premium Online Store",
    icon: ShoppingBag,
    items: [
      "Fully Custom UI",
      "Lightning Fast",
      "Responsive Design",
      "SEO Ready",
    ],
  },
  {
    no: "02",
    title: "Product Management",
    icon: Box,
    items: [
      "Unlimited Products",
      "Categories",
      "Variants",
      "Collections",
    ],
  },
  {
    no: "03",
    title: "Customer Experience",
    icon: Heart,
    items: [
      "Wishlist",
      "Reviews",
      "Coupons",
      "Loyalty",
    ],
  },
  {
    no: "04",
    title: "Multiple Payment Options",
    icon: CreditCard,
    items: [
      "UPI · Cards · Net Banking",
      "Wallets · COD",
      "International",
      "Secure Gateways",
    ],
  },
  {
    no: "05",
    title: "Order Management",
    icon: ClipboardList,
    items: [
      "Order Processing",
      "Order Tracking",
      "Returns",
      "Refunds",
    ],
  },
  {
    no: "06",
    title: "Inventory Management",
    icon: Package,
    items: [
      "Real-Time Stock",
      "Low Stock Alerts",
      "Warehouse Support",
      "Multi-location",
    ],
  },
  {
    no: "07",
    title: "Shipment Management",
    icon: Truck,
    items: [
      "Shipment Integration",
      "Shipment Tracking",
      "Shipping Labels",
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
  "Shopify-like User Experience",
  "Mobile Responsive Design",
  "Business Analytics Dashboard",
  "Marketing Intelligence",
  "Shipment Integration",
  "Inventory Management",
  "CRM & Lead Management",
  "AI Automation",
  "Custom Admin Panel",
];

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF4800]">
      {children}
    </p>
  );
}

function ModuleCard({
  module,
}: {
  module: (typeof coreModules)[number];
}) {
  const Icon = module.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#0f172a]/10 bg-white/80 p-6 shadow-[0_15px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4800]/40 hover:shadow-[0_20px_60px_rgba(255,72,0,0.10)]">

      <div className="absolute right-5 top-5 h-7 w-10 rounded-full bg-[#FF4800]/10 blur-xl transition-all group-hover:bg-[#FF4800]/20" />

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF4800]/20 bg-[#FF4800]/5 text-[#FF4800]">
          <Icon size={18} />
        </div>

        <span className="text-[10px] font-bold tracking-[0.18em] text-[#FF4800]">
          {module.no}
        </span>

      </div>

      <h3 className="mt-7 text-lg font-semibold tracking-tight text-[#0f172a]">
        {module.title}
      </h3>

      <div className="my-5 h-px bg-gradient-to-r from-[#FF4800] via-[#FF4800]/30 to-transparent" />

      <div className="space-y-3">

        {module.items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 text-sm text-[#64748b]"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4800]" />
            <span>{item}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

function AdvancedCard({
  module,
  step,
  isLast,
}: {
  module: (typeof advancedModules)[number];
  step: number;
  isLast: boolean;
}) {
  const Icon = module.icon;

  return (
    <div className="relative w-1/5 text-center">
      {/* Step number */}
      <div className="mb-3 text-[9px] font-bold tracking-[0.15em] text-[#FF4800]">
        {String(step).padStart(2, "0")}
      </div>

      {/* Icon + connecting line */}
      <div className="relative flex h-16 w-full items-center justify-center">
        {/* Left line */}
        {step > 1 && (
          <span className="absolute right-1/2 top-1/2 h-[2px] w-1/2 -translate-y-1/2 bg-[#FF4800]/25" />
        )}

        {/* Right line */}
        {!isLast && (
          <span className="absolute left-1/2 top-1/2 h-[2px] w-1/2 -translate-y-1/2 bg-[#FF4800]/25" />
        )}

        {/* Icon */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3eb]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4800] text-white shadow-[0_8px_25px_rgba(255,72,0,0.22)]">
            <Icon size={20} strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* Text directly below same icon */}
      <div className="mx-auto mt-6 w-full max-w-[210px] text-left">
        <h3 className="text-sm font-semibold tracking-tight text-[#0f172a] md:text-base">
          {module.title}
        </h3>

        <ul className="mt-4 space-y-2">
          {module.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[11px] leading-5 text-[#64748b]"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#FF4800]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CommerceOSPage() {

  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);

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
    <main className="overflow-hidden bg-[#fffaf8] text-[#0f172a]">

      {/* =========================================================
          01 — HERO
      ========================================================= */}

      <section className="relative min-h-screen overflow-hidden pt-32">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">

          <div className="absolute right-[-8%] top-[8%] h-[650px] w-[650px] rounded-full bg-[#FF4800]/10 blur-[130px]" />

          <div className="absolute bottom-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[120px]" />

        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 px-6 pb-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT CONTENT */}

          <div className="relative z-20">

            <div className="mb-6 inline-flex rounded-full border border-[#FF4800]/25 bg-[#FF4800]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4800]">
              Premium Commerce Platform
            </div>

{/* Headline */}
<motion.h1
  initial={{ opacity: 0, y: 36 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65, delay: 0.1 }}
  className="font-bold text-left mb-5"
  style={{
     fontSize: 'clamp(2rem, 5vw, 3.25rem)',
     lineHeight: 1.1,
     letterSpacing: '-1.5px',
    color: "#111827",
    maxWidth: "620px",
  }}
>
  Custom
  <br />
  eCommerce
  <br />
  Solutions
  <br />
  More Than an
  <br />
  <span style={{ color: "#FF4800" }}>
    Online Store.
  </span>
</motion.h1>

            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-[#334155]">
              A Complete Commerce & Business Platform
            </p>

            <p className="mt-2 max-w-xl text-sm leading-7 text-[#64748b]">
              Premium custom-built eCommerce websites with integrated
              business operations, marketing intelligence, AI insights,
              and enterprise workflows.
            </p>

           <div className="mt-9 grid max-w-xl grid-cols-3">

  <div className="py-5 pr-5">
    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
      Platform
    </p>

    <p className="mt-2 text-sm font-bold">
      Commerce OS
    </p>

    <p className="mt-1 text-[10px] text-[#64748b]">
      Operating system
    </p>
  </div>

  <div className="px-5 py-5">
    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
      Modules
    </p>

    <p className="mt-2 text-sm font-bold">
      12+ Built-in
    </p>

    <p className="mt-1 text-[10px] text-[#64748b]">
      Native integrations
    </p>
  </div>

  <div className="py-5 pl-5">
    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
      Brand
    </p>

    <p className="mt-2 text-sm font-bold">
      Straveda
    </p>

    <p className="mt-1 text-[10px] text-[#64748b]">
      Premium commerce
    </p>
  </div>

</div>
           <Link
  href="/contact"
  className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#FF4800]/25 bg-white px-5 py-3 text-xs font-semibold shadow-sm cursor-pointer transition-all duration-300 hover:border-[#FF4800]/50 hover:shadow-md"
>
  <ArrowRight
    size={15}
    className="text-[#FF4800]"
  />

  Built for brands that mean business
</Link>

          </div>


          {/* RIGHT VISUAL */}

          <div className="relative min-h-[650px] lg:min-h-[720px]">

            {/* Ambient glow */}

            <div className="absolute right-[8%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#FF4800]/10 blur-[100px]" />

            {/* Orbit */}

            <div className="absolute right-[3%] top-[8%] h-[520px] w-[520px] rounded-full border border-[#FF4800]/10" />

            <div className="absolute right-[12%] top-[17%] h-[360px] w-[360px] rounded-full border border-[#FF4800]/10" />


            {/* =====================================================
                MAIN DASHBOARD
            ===================================================== */}

            <div className="commerce-dashboard absolute right-[2%] top-[8%] z-20 w-[88%] max-w-[610px] rounded-[28px] border border-[#0f172a]/10 bg-white p-3 shadow-[0_35px_100px_rgba(15,23,42,0.16)]">

              <div className="rounded-[21px] border border-[#0f172a]/10 bg-[#f8fafc] p-4">

                {/* Browser header */}

                <div className="flex items-center justify-between border-b border-[#0f172a]/10 pb-4">

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

                    <span className="rounded-lg border border-[#0f172a]/10 bg-white px-3 py-1.5 text-[8px] text-[#64748b]">
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
                      className="rounded-xl border border-[#0f172a]/10 bg-white p-3.5"
                    >

                      <p className="text-[7px] font-bold tracking-wider text-[#94a3b8]">
                        {label}
                      </p>

                      <p className="mt-2 text-lg font-bold text-[#0f172a]">
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

                  <div className="rounded-xl border border-[#0f172a]/10 bg-white p-4">

                    <div className="flex items-center justify-between">

                      <p className="text-[8px] font-bold uppercase tracking-wider text-[#64748b]">
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

                  <div className="rounded-xl border border-[#0f172a]/10 bg-white p-4">

                    <div className="flex items-center justify-between">

                      <p className="text-[8px] font-bold uppercase tracking-wider text-[#64748b]">
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
                                  : "text-[#64748b]"
                            }
                          >
                            {status}
                          </span>

                        </div>

                      ))}

                    </div>

                    <div className="mt-6 rounded-lg bg-[#fff7f2] p-3">

                      <div className="flex items-center gap-2">

                        <Truck
                          size={13}
                          className="text-[#FF4800]"
                        />

                        <span className="text-[8px] font-bold">
                          Shipment Tracking
                        </span>

                      </div>

                      <div className="mt-3 h-1 rounded-full bg-[#e2e8f0]">

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

                    const ModuleIcon =
                      Icon as typeof Sparkles;

                    return (
                      <div
                        key={String(label)}
                        className="rounded-lg border border-[#0f172a]/10 bg-white px-2 py-3"
                      >

                        <ModuleIcon
                          size={12}
                          className="text-[#FF4800]"
                        />

                        <p className="mt-2 text-[7px] font-semibold text-[#64748b]">
                          {String(label)}
                        </p>

                      </div>
                    );

                  })}

                </div>

              </div>

            </div>


            {/* =====================================================
                FLOATING NEW ORDER
            ===================================================== */}

            <div className="commerce-float-order absolute right-[-8%] top-[-2%] z-20 w-[190px] rounded-2xl border border-[#0f172a]/10 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)]">

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


            {/* =====================================================
                FLOATING SHIPMENT CARD
            ===================================================== */}

            <div className="commerce-float-shipment absolute bottom-[4%] left-[-8%] z-40 w-[220px] rounded-2xl border border-[#0f172a]/10 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)]">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0e8]">

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
                          : "bg-[#cbd5e1]"
                      }`}
                    />

                    {step !== 4 && (
                      <span
                        className={`h-[2px] flex-1 ${
                          step < 3
                            ? "bg-[#FF4800]"
                            : "bg-[#cbd5e1]"
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


            {/* =====================================================
                SMART WATCH
            ===================================================== */}

            <div className="commerce-watch absolute bottom-[2%] right-[4%] z-40">

              {/* Upper strap */}

              <div className="absolute left-1/2 top-[-30px] h-[90px] w-[58px] -translate-x-1/2 rounded-[25px] bg-[#e2e8f0]" />

              {/* Lower strap */}

              <div className="absolute bottom-[-30px] left-1/2 h-[90px] w-[58px] -translate-x-1/2 rounded-[25px] bg-[#e2e8f0]" />


              {/* Watch */}

              <div className="relative flex h-[150px] w-[125px] rotate-[8deg] items-center justify-center rounded-[35px] border-[6px] border-[#cbd5e1] bg-[#111827] shadow-[0_25px_60px_rgba(15,23,42,0.22)]">

                {/* Screen */}

                <div className="flex h-[116px] w-[94px] flex-col items-center justify-center rounded-[25px] bg-[#fffaf8]">

                  <p className="text-[7px] font-bold uppercase tracking-widest text-[#94a3b8]">
                    COMMERCE OS
                  </p>

                  <p className="mt-2 text-xl font-bold text-[#0f172a]">
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

                {/* Crown */}

                <div className="absolute right-[-10px] top-[48px] h-7 w-3 rounded-r-md bg-[#94a3b8]" />

              </div>

            </div>

          </div>

        </div>


        {/* =========================================================
            HERO ANIMATIONS
        ========================================================= */}

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

            0%,
            100% {
              transform: translateY(0px) rotate(1deg);
            }

            50% {
              transform: translateY(-10px) rotate(0.5deg);
            }

          }

          @keyframes orderFloat {

            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-12px);
            }

          }

          @keyframes shipmentFloat {

            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(10px);
            }

          }

          @keyframes watchFloat {

            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }

            50% {
              transform: translateY(-15px) rotate(3deg);
            }

          }

          @keyframes barPulse {

            from {
              transform: scaleY(0.94);
              opacity: 0.7;
            }

            to {
              transform: scaleY(1);
              opacity: 1;
            }

          }

          @media (max-width: 1024px) {

            .commerce-watch {
              right: 5%;
              bottom: 2%;
              transform: scale(0.85);
            }

            .commerce-float-order {
              right: 0;
            }

            .commerce-float-shipment {
              left: 0;
            }

          }

          @media (max-width: 640px) {

            .commerce-dashboard {
              position: relative;
              right: auto;
              top: auto;
              width: 100%;
            }

            .commerce-float-order {
              right: -5px;
              top: 40%;
              transform: scale(0.8);
            }

            .commerce-float-shipment {
              left: -5px;
              bottom: 12%;
              transform: scale(0.8);
            }

            .commerce-watch {
              right: 3%;
              bottom: 0;
              transform: scale(0.65);
            }

          }

        `}</style>

      </section>


    {/* =========================================================
    02 — EVERYTHING YOUR ONLINE BUSINESS NEEDS / BENTO
========================================================= */}

<section
  id="platform"
  className="relative overflow-hidden bg-white py-16 md:py-20"
>
  <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10">

    <div className="max-w-4xl">
      <SectionLabel>Commerce Modules</SectionLabel>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="masked-title text-3xl md:text-4xl font-normal tracking-[-1.5px]"
      >
        <span className="text-[#0f172a]">
          Everything Your Online{" "}
        </span>

        <span
          className="bg-gradient-to-r from-[#3b2436] via-[#8b4a45] to-[#FF4800] bg-clip-text text-transparent"
        >
          Business Needs
        </span>
      </motion.h2>

      <p className="mt-6 text-base leading-7 text-[#64748b] md:whitespace-nowrap">
        Seven integrated modules power the entire Straveda Commerce OS — from
        storefront to shipment, in one premium platform.
      </p>
    </div>


    {/* =====================================================
    COMMERCE MODULES — 2 / 3 / 2 BENTO
===================================================== */}

<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">

  {/* =====================================================
      ROW 1 — 2 CARDS
  ===================================================== */}

  {/* 01 — Premium Online Store */}
  <div className="bento-card group relative min-h-[235px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-gradient-to-br from-[#eef3f1] via-[#f7f8f5] to-[#f4dfc5] p-5 md:col-span-4">

    <div className="relative z-10">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
        Commerce
      </p>

      <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
        Premium Online Store
      </h3>

      <p className="mt-2 max-w-md text-xs leading-5 text-[#64748b]">
        Custom storefront engineered for speed, conversion and seamless
        customer experiences.
      </p>
    </div>

    <div className="absolute bottom-4 left-4 right-4 h-[96px] overflow-hidden rounded-[20px] border border-white/70 bg-[#fff1eb] p-4 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">

      <div className="flex items-center gap-2 border-b border-[#0f172a]/10 pb-3">
        <span className="h-2 w-2 rounded-full bg-[#d9a06c]" />
        <span className="h-2 w-2 rounded-full bg-[#9eb7ae]" />
        <span className="h-2 w-2 rounded-full bg-[#d6ddd8]" />
      </div>

      <div className="mt-3 grid grid-cols-[1fr_2fr] gap-2">

        <div className="space-y-2">
          <div className="h-3 w-16 rounded-full bg-[#d8ded9]" />
          <div className="h-2 w-24 rounded-full bg-[#e2e6e2]" />
          <div className="h-2 w-20 rounded-full bg-[#e2e6e2]" />
        </div>

        <div className="flex items-end gap-2">
          {[45, 70, 52, 85, 64, 95].map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#c99a68] to-[#e7c49d]"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>

      </div>
    </div>
  </div>


  {/* 02 — Product Management */}
  <div className="bento-card group relative min-h-[235px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-[#f5eee5] p-5 md:col-span-2">

    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
      Catalog
    </p>

    <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
      Product Management
    </h3>

    <p className="mt-2 text-xs leading-5 text-[#64748b]">
      Products, categories, variants and collections — all managed from one
      place.
    </p>

    <div className="absolute bottom-4 left-4 right-4 rounded-[20px] bg-[#fff1eb] p-3 shadow-[0_15px_35px_rgba(15,23,42,0.08)]">

      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold uppercase tracking-wider text-[#94a3b8]">
          Products
        </span>

        <span className="text-sm font-semibold text-[#0f172a]">
          1,284
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-10 flex-1 rounded-xl bg-[#dce8e4]" />
        <div className="h-10 flex-1 rounded-xl bg-[#e6c49c]" />
        <div className="h-10 flex-1 rounded-xl bg-[#d5ddd8]" />
      </div>

    </div>
  </div>


  {/* =====================================================
      ROW 2 — 3 CARDS
  ===================================================== */}

  {/* 03 — Customer Experience */}
  <div className="bento-card group relative min-h-[220px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-[#edf2ef] p-5 md:col-span-2">

    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
      Experience
    </p>

    <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
      Customer Experience
    </h3>

    <p className="mt-2 text-xs leading-5 text-[#64748b]">
      Build loyalty with wishlist, reviews, coupons and personalized
      customer journeys.
    </p>

    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[18px] bg-[#fff1eb] p-3">

      <div className="flex -space-x-2">
        {["AK", "RM", "PS", "JD"].map((name, i) => (
          <span
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#dce7e2] text-[8px] font-bold text-[#64748b]"
          >
            {name}
          </span>
        ))}
      </div>

      <span className="rounded-full bg-[#e8c49b] px-3 py-2 text-[8px] font-bold text-[#5f4b36]">
        +12
      </span>

    </div>
  </div>


  {/* 04 — Multiple Payment Options */}
  <div className="bento-card group relative min-h-[220px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-[#f7f5ef] p-5 md:col-span-2">

    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
      Payments
    </p>

    <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
      Multiple Payment Options
    </h3>

    <p className="mt-2 max-w-sm text-xs leading-5 text-[#64748b]">
      Give customers a seamless checkout experience with secure and flexible
      payment options.
    </p>

    <div className="absolute bottom-4 left-4 right-4 rounded-[22px] bg-[#fff1eb] p-3 shadow-[0_15px_35px_rgba(15,23,42,0.07)]">

      <p className="text-[8px] font-bold uppercase tracking-wider text-[#94a3b8]">
        Secure Checkout
      </p>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {["UPI", "Cards", "Wallets", "COD"].map((item) => (
          <div
            key={item}
            className="rounded-full border border-[#0f172a]/10 bg-white px-3 py-1.5 text-center text-[8px] font-semibold text-[#475569]"
          >
            {item}
          </div>
        ))}
      </div>

    </div>
  </div>


  {/* 05 — Order Management */}
  <div className="bento-card group relative min-h-[220px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-[#f0f3f1] p-5 md:col-span-2">

    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
      Operations
    </p>

    <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
      Order Management
    </h3>

    <p className="mt-2 text-xs leading-5 text-[#64748b]">
      Track every order from processing to delivery, returns and refunds.
    </p>

    <div className="absolute bottom-4 left-4 right-4 space-y-1.5">

      {[
        ["#4827", "Shipped"],
        ["#4831", "Processing"],
        ["#4838", "Delivered"],
      ].map(([order, status]) => (
        <div
          key={order}
          className="flex items-center justify-between rounded-[14px] bg-[#fff1eb] px-3 py-2 shadow-sm"
        >
          <span className="text-[9px] font-bold text-[#475569]">
            {order}
          </span>

          <span className="text-[8px] font-semibold text-[#FF4800]">
            {status}
          </span>
        </div>
      ))}

    </div>
  </div>


  {/* =====================================================
      ROW 3 — 2 CARDS
  ===================================================== */}

  {/* 06 — Inventory Management */}
  <div className="bento-card group relative min-h-[235px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-[#edf1f0] p-5 md:col-span-4">

    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
      Inventory
    </p>

    <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
      Inventory Management
    </h3>

    <p className="mt-2 text-xs leading-5 text-[#64748b]">
      Real-time stock visibility with intelligent alerts and multi-location
      support.
    </p>

    <div className="absolute bottom-4 left-4 right-4">

      <div className="flex items-center justify-between text-[8px] font-bold text-[#94a3b8]">
        <span>STOCK LEVEL</span>
        <span>82%</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#ffe1d4]">
        <div className="h-full w-[82%] rounded-full bg-[#FF4800]" />
      </div>

    </div>
  </div>


  {/* 07 — Shipment Management */}
  <div className="bento-card group relative min-h-[235px] overflow-hidden rounded-[28px] border border-[#e8c7a8] bg-gradient-to-br from-[#f8eee5] to-[#edf1ef] p-5 md:col-span-2">

    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
      Logistics
    </p>

    <h3 className="mt-2 text-xl font-semibold tracking-[-0.8px] text-[#0f172a]">
      Shipment Management
    </h3>

    <p className="mt-2 text-xs leading-5 text-[#64748b]">
      Connect shipments, generate labels and track deliveries in real time.
    </p>

    <div className="absolute bottom-4 left-4 right-4">

      <div className="relative h-[8px] rounded-full bg-[#ffe1d4]">

        <div className="absolute left-0 top-1/2 h-[8px] w-[62%] -translate-y-1/2 rounded-full bg-[#FF4800]" />

        <span className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#FF4800] bg-white" />

        <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#FF4800] bg-white" />

      </div>

      <div className="mt-3 flex justify-between text-[7px] font-bold uppercase text-[#94a3b8]">
        <span>Packed</span>
        <span>Delivery</span>
      </div>

    </div>
  </div>

</div>


{/* =====================================================
    BENTO HOVER ANIMATIONS
===================================================== */}

<style jsx>{`
  .bento-card {
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.45s ease,
      border-color 0.35s ease,
      background 0.35s ease;
  }

  .bento-card:hover {
    transform: translateY(-7px);

    background: #fff1eb;

    border-color: #ff4800;

    box-shadow:
      0 18px 45px rgba(255, 72, 0, 0.12),
      0 4px 12px rgba(255, 72, 0, 0.06);
  }

  .bento-card:hover h3 {
    color: #ff4800;
    transition: color 0.3s ease;
  }

  .bento-card:hover > div {
    transition:
      transform 0.4s ease,
      box-shadow 0.4s ease;
  }

  .bento-card:hover .bg-\\[\\#fff1eb\\] {
    box-shadow:
      0 12px 30px rgba(255, 72, 0, 0.08);
  }

  @media (max-width: 767px) {
    .bento-card {
      min-height: 260px;
    }

    .bento-card:hover {
      transform: translateY(-4px);
    }
  }
`}</style>

  </div>
</section>


      {/* =========================================================
          03 — BEYOND A STORE
      ========================================================= */}

      <section className="relative bg-[#fffaf8] py-16 md:py-20">

        <div className="-mt-10 mx-auto max-w-7xl px-6 md:px-10">

          <div className="max-w-4xl">

            <SectionLabel>
               Business Intelligence
            </SectionLabel>

         <h2
  className="font-normal heading-gradient"
  style={{
    fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
    lineHeight: 1.05,
    letterSpacing: '-1.5px',
    whiteSpace: 'nowrap',
    width: 'max-content',
    maxWidth: '100%',
  }}
>
  Beyond a Store Built for Business Growth
</h2>

           <p className="mt-6 text-base leading-7 text-[#64748b] whitespace-nowrap">
  Five advanced modules that turn Straveda Commerce OS from a storefront into a full business operating system — analytics, marketing, CRM, omnichannel, AI.
</p>

          </div>

       <div className="mt-14 w-full overflow-hidden">
  <div className="flex w-full items-start gap-0">
    {advancedModules.map((module, stepIndex) => (
      <AdvancedCard
        key={module.title}
        module={module}
        step={stepIndex + 1}
        isLast={stepIndex === advancedModules.length - 1}
      />
    ))}
  </div>
</div>
<style jsx>{`

  /* ================================
     MAIN SECTION
  ================================= */

  .advanced-modules-section {
    width: 100%;
  }

  /* ================================
     HEADING
  ================================= */

  .advanced-modules-title {
    width: 100%;
    max-width: 100%;
    margin: 0;
    text-align: center;

    font-size: clamp(1.6rem, 3.5vw, 3rem);
    line-height: 1.05;
    letter-spacing: -1.5px;
  }

  /* ================================
     DESCRIPTION
  ================================= */

  .advanced-modules-description {
    width: 100%;
    max-width: 1100px;
    margin: 24px auto 0;

    text-align: center;

    font-size: 16px;
    line-height: 1.75;
    color: #64748b;
  }

  /* ================================
     STEPPER
  ================================= */

  .advanced-modules-stepper {
    width: 100%;
    margin-top: 56px;

    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .advanced-module-item {
    position: relative;

    flex: 1 1 0;
    min-width: 0;

    display: flex;
    justify-content: center;
    text-align: center;
  }

  /* ================================
     CENTER ALL CARD CONTENT
  ================================= */

  .advanced-module-item :global(.advanced-card),
  .advanced-module-item :global(.card) {
    text-align: center;
  }

  .advanced-module-item :global(h3),
  .advanced-module-item :global(h4) {
    width: 100%;
    text-align: center;
  }

  .advanced-module-item :global(p) {
    text-align: center;
  }

  /* ================================
     CENTER BULLET POINTS
  ================================= */

  .advanced-module-item :global(ul) {
    width: 100%;

    margin-left: auto;
    margin-right: auto;

    padding: 0;

    list-style: none;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .advanced-module-item :global(li) {
    width: fit-content;

    text-align: center;

    margin-left: auto;
    margin-right: auto;
  }

  /* ================================
     DESKTOP
  ================================= */

  @media (max-width: 1100px) {

    .advanced-modules-stepper {
      gap: 10px;
    }

    .advanced-module-item {
      flex: 1 1 0;
    }

    .advanced-modules-description {
      max-width: 900px;
    }
  }

  /* ================================
     TABLET
  ================================= */

  @media (max-width: 850px) {

    .advanced-modules-stepper {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 40px 20px;
    }

    .advanced-module-item {
      width: 100%;
    }

    .advanced-modules-description {
      white-space: normal;
      font-size: 15px;
    }
  }

  /* ================================
     MOBILE
  ================================= */

  @media (max-width: 640px) {

    .advanced-modules-title {
      font-size: 30px;
      letter-spacing: -1px;
      white-space: normal;
    }

    .advanced-modules-description {
      margin-top: 18px;

      font-size: 14px;
      line-height: 1.6;

      white-space: normal;
    }

    .advanced-modules-stepper {
      grid-template-columns: 1fr;
      gap: 32px;

      margin-top: 40px;
    }

    .advanced-module-item {
      width: 100%;
    }

    .advanced-module-item :global(ul) {
      align-items: center;
    }

    .advanced-module-item :global(li) {
      text-align: center;
    }
  }

`}</style>

        </div>

      </section>





      {/* =========================================================
          04 — COMPLETE BUSINESS WORKFLOW
      ========================================================= */}

      <section className="bg-white py-16 md:py-20">

        <div className="-mt-10 mx-auto max-w-7xl px-6 md:px-10">

          <div className="max-w-4xl">

            <SectionLabel>
               Connected Journey
            </SectionLabel>

           <h2
  className="font-normal heading-gradient"
  style={{
    fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
    lineHeight: 1.05,
    letterSpacing: '-1.5px',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  }}
>
  Complete Business Workflow
</h2>

           <p className="mt-6 max-w-none whitespace-nowrap max-md:whitespace-normal text-base leading-7 text-[#64748b]">
  Every customer journey — from first click to retention — flows through one connected Straveda Commerce OS pipeline.
</p>

          </div>

          <div className="mt-14 rounded-[28px] border border-[#0f172a]/10 bg-[#fffaf8] p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] md:p-8">

            <div className="flex flex-col justify-between gap-5 border-b border-[#0f172a]/10 pb-6 md:flex-row md:items-center">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4800]">
                  One Connected Journey
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  From first click to retention
                </h3>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-[9px] font-bold text-[#64748b]">
                  14 STEPS
                </span>

                <div className="h-1.5 w-28 rounded-full bg-[#e2e8f0]">

                  <div className="h-1.5 w-3/4 rounded-full bg-[#FF4800]" />

                </div>

              </div>

            </div>

            <div className="workflow-stepper mt-14">

  {/* =========================
      ANIMATED JOURNEY PATH
  ========================= */}
  <div className="workflow-path" aria-hidden="true">
    <svg
      viewBox="0 0 1000 300"
      preserveAspectRatio="none"
      className="workflow-path-svg"
    >
      <path
        id="journeyPath"
        d="M 25 75 H 975 V 225 H 25"
        fill="none"
        stroke="#FF4800"
        strokeWidth="2"
        opacity="0.9"
      />

      {/* Moving orange particle */}
      <circle r="5" fill="#FF4800">
  <animateMotion
    dur="14s"
    repeatCount="indefinite"
    rotate="auto"
    path="M 25 75 H 975 V 225 H 25"
  />
</circle>

      {/* Glow around particle */}
      <circle r="10" fill="#FF4800" opacity="0.12">
  <animateMotion
    dur="14s"
    repeatCount="indefinite"
    rotate="auto"
    path="M 25 75 H 975 V 225 H 25"
  />
</circle>

    </svg>
  </div>


  {/* =========================
      ROW 1 — 1 → 7
  ========================= */}
  <div className="workflow-stepper-row workflow-row-top">
    {workflow.slice(0, 7).map(([number, title], index) => (
      <div className="workflow-step-wrap" key={number}>

        <div
  className={`workflow-step ${
    activeWorkflowStep === Number(number)
      ? "workflow-active"
      : ""
  }`}
>

          <span className="workflow-step-number">
            {Number(number)}
          </span>

          <div className="workflow-step-content">
            <p className="text-sm font-semibold text-[#0f172a]">
              {title}
            </p>

            <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
              Customer Journey
            </p>
          </div>
        </div>

        {index < 6 && (
          <span
            className="workflow-connector"
            aria-hidden="true"
          />
        )}

      </div>
    ))}
  </div>


  {/* =========================
      ROW 2 — 14 → 8
  ========================= */}
  <div className="workflow-stepper-row workflow-row-bottom">
    {workflow.slice(7).reverse().map(([number, title], index) => (
      <div className="workflow-step-wrap" key={number}>

        <div
  className={`workflow-step ${
    activeWorkflowStep === Number(number)
      ? "workflow-active"
      : ""
  }`}
>

          <span className="workflow-step-number">
            {Number(number)}
          </span>

          <div className="workflow-step-content">
            <p className="text-sm font-semibold text-[#0f172a]">
              {title}
            </p>

            <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
              Business Loop
            </p>
          </div>
        </div>

        {index < 6 && (
          <span
            className="workflow-connector"
            aria-hidden="true"
          />
        )}

      </div>
    ))}
  </div>


 <style jsx>{`
  /* =====================================
     WORKFLOW
  ===================================== */

  .workflow-stepper {
    width: 100%;
    position: relative;
    padding: 0;
  }


  /* =====================================
     ORANGE JOURNEY PATH
     IMPORTANT — PATH MUST BE BEHIND ROWS
  ===================================== */

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


  /* =====================================
     ROW
  ===================================== */

  .workflow-stepper-row {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: stretch;
    justify-content: center;

    width: 100%;
  }

  .workflow-row-top {
    margin-bottom: 70px;
  }

  .workflow-row-bottom {
    margin-top: 0;
  }


  /* =====================================
     STEP WRAPPER
  ===================================== */

  .workflow-step-wrap {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1 1 0;
    min-width: 0;
  }


  /* =====================================
     STEP CARD
  ===================================== */

  .workflow-step {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    width: calc(100% - 28px);
    min-height: 124px;

    padding: 14px;

    border: 1px solid #e2e8f0;
    border-radius: 18px;

    background: rgba(255, 255, 255, 0.96);

    box-shadow:
      0 8px 25px rgba(15, 23, 42, 0.04);

    text-align: center;

    transition:
      transform 0.3s ease,
      border-color 0.3s ease,
      background 0.3s ease,
      box-shadow 0.3s ease;
  }


  /* =====================================
     CARD HOVER
  ===================================== */

  .workflow-step:hover {
    transform: translateY(-4px);

    border-color: #ff4800;

    background: #fff7f2;

    box-shadow:
      0 16px 35px rgba(255, 72, 0, 0.12);
  }
      .workflow-step.workflow-active {
  transform: translateY(-4px);

  border-color: #ff4800;

  background: #fff7f2;

  box-shadow:
    0 16px 35px rgba(255, 72, 0, 0.12);
}

.workflow-step.workflow-active .workflow-step-number {
  background: #ff4800;
  color: #ffffff;

  transform: scale(1.06);
}


  /* =====================================
     NUMBER
  ===================================== */

  .workflow-step-number {
    display: flex;

    width: 32px;
    height: 32px;

    flex: 0 0 32px;

    align-items: center;
    justify-content: center;

    margin: 0 auto 14px auto;

    border: 1px solid rgba(255, 72, 0, 0.35);
    border-radius: 10px;

    background: #fff7f2;

    color: #ff4800;

    font-size: 9px;
    font-weight: 800;

    transition:
      background 0.3s ease,
      color 0.3s ease,
      transform 0.3s ease;
  }

  .workflow-step:hover .workflow-step-number {
    background: #ff4800;
    color: #ffffff;
    transform: scale(1.06);
  }


  /* =====================================
     CONTENT
  ===================================== */

  .workflow-step-content {
    min-width: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  .workflow-step-content p {
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    text-align: center;
  }

  .workflow-step-content p:first-child {
    line-height: 1.35;
  }



  /* =====================================
     SECOND ROW — LEFT DIRECTION
  ===================================== */

  .workflow-row-bottom .workflow-step-wrap {
    flex-direction: row-reverse;
  }

  .workflow-row-bottom .workflow-connector {
    right: auto;
    left: -1px;
  }


  /* =====================================
     TABLET
  ===================================== */

  @media (max-width: 1100px) {

    .workflow-stepper-row {
      justify-content: center;
    }

    .workflow-step-wrap {
      flex: 1 1 0;
    }

    .workflow-step {
      width: calc(100% - 20px);
      min-height: 115px;
      padding: 13px;
    }

    .workflow-step-number {
      width: 30px;
      height: 30px;
      flex-basis: 30px;

      margin: 0 auto 11px auto;
    }

    .workflow-connector {
      width: 14px;
    }

    .workflow-row-top {
      margin-bottom: 55px;
    }
  }


  /* =====================================
     SMALL TABLET
  ===================================== */

  @media (max-width: 850px) {

    .workflow-path {
      display: none;
    }

    .workflow-stepper-row {
      display: grid;

      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      gap: 16px;

      justify-content: center;
    }

    .workflow-row-top {
      margin-bottom: 24px;
    }

    .workflow-row-bottom {
      margin-top: 0;
    }

    .workflow-step-wrap {
      width: 100%;
      flex: none;
    }

    .workflow-connector {
      display: none;
    }

    .workflow-step {
      width: 100%;
      min-height: 105px;
    }

    .workflow-row-bottom .workflow-step-wrap {
      flex-direction: row;
    }
  }


  /* =====================================
     MOBILE
  ===================================== */

  @media (max-width: 640px) {

    .workflow-stepper {
      width: 100%;
    }

    .workflow-stepper-row {
      display: grid;

      grid-template-columns: 1fr;

      gap: 12px;

      width: 100%;
    }

    .workflow-row-top {
      margin-bottom: 14px;
    }

    .workflow-row-bottom {
      margin-top: 0;
    }

    .workflow-step-wrap {
      width: 100%;
      flex: none;
    }

    .workflow-connector {
      display: none;
    }

    .workflow-step {
      width: 100%;

      min-height: 90px;

      padding: 13px 14px;

      border-radius: 15px;

      align-items: center;
      text-align: center;
    }

    .workflow-step-number {
      width: 30px;
      height: 30px;
      flex-basis: 30px;

      margin: 0 auto 9px auto;
    }

    .workflow-step-content {
      width: 100%;

      align-items: center;
      text-align: center;
    }

    .workflow-step-content p:first-child {
      font-size: 13px;
      text-align: center;
    }

    .workflow-step-content p:last-child {
      font-size: 7px;
      text-align: center;
    }

    .workflow-row-bottom .workflow-step-wrap {
      flex-direction: row;
    }
  }


  /* =====================================
     VERY SMALL MOBILE
  ===================================== */

  @media (max-width: 400px) {

    .workflow-step {
      min-height: 84px;
      padding: 12px;
    }

    .workflow-step-number {
      width: 28px;
      height: 28px;
      flex-basis: 28px;
    }

    .workflow-step-content p:first-child {
      font-size: 12px;
      text-align: center;
    }

    .workflow-step-content p:last-child {
      text-align: center;
    }
  }
`}</style>

</div>

            <div className="mt-7 flex justify-end">

              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">

                <RefreshCw size={12} />

                Continues +

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          05 — STRAVEDA ADVANTAGE
      ========================================================= */}

      <section className="bg-[#fffaf8] py-16 md:py-20">

        <div className="-mt-10 mx-auto max-w-7xl px-6 md:px-10">

          <div className="max-w-4xl">

            <SectionLabel>
               The Straveda Advantage
            </SectionLabel>

            
            <h2
            className="font-normal heading-gradient mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word' }}
          >
            Why Business Choose Straveda
          </h2>
           <p className="mt-6 text-base leading-7 text-[#64748b] whitespace-nowrap max-md:whitespace-normal">
  A side-by-side reality check on what changes when you move from stitched-together tools to one unified Commerce OS.
</p>

          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">

            {/* OLD WAY */}

            <div className="rounded-3xl border border-[#0f172a]/10 bg-white p-7 shadow-sm md:p-9">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                The Old Way
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Traditional eCommerce
              </h3>

              <div className="mt-8 space-y-4">

                {oldWay.map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#64748b]"
                  >

                    <span className="text-[#94a3b8]">
                      ×
                    </span>

                    {item}

                  </div>

                ))}

              </div>

              <div className="mt-10 border-t border-[#0f172a]/10 pt-5">

                <p className="text-xs font-semibold text-[#94a3b8]">
                  6+ tools · fragmented ops
                </p>

              </div>

            </div>


            {/* STRAVEDA WAY */}

            <div className="relative overflow-hidden rounded-3xl border border-[#FF4800]/30 bg-[#fff3eb] p-7 shadow-[0_20px_70px_rgba(255,72,0,0.08)] md:p-9">

              <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#FF4800]/10 blur-3xl" />

              <div className="relative">

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4800]">
                  The Straveda Way
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  Straveda Commerce Platform
                </h3>

                <div className="mt-8 space-y-4">

                  {stravedaWay.map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-[#334155]"
                    >

                      <Check
                        size={15}
                        className="shrink-0 text-[#FF4800]"
                      />

                      {item}

                    </div>

                  ))}

                </div>

                <div className="mt-10 border-t border-[#FF4800]/20 pt-5">

                  <p className="text-xs font-bold text-[#FF4800]">
                    1 platform · unified commerce OS
                  </p>

                </div>

              </div>

            </div>

          </div>


          <div className="mt-5 rounded-2xl border border-[#FF4800]/25 bg-white px-6 py-5 text-center shadow-sm">

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">

              <span>
                One Platform.
              </span>

              <span className="text-[#FF4800]">
                •
              </span>

              <span>
                One Dashboard.
              </span>

              <span className="text-[#FF4800]">
                •
              </span>

              <span>
                Complete Business Control.
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          06 — FINAL CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-white py-16 md:py-20">


        <div className="-mt-10 mx-auto max-w-7xl px-6 md:px-10">

          <SectionLabel>
            Your Commerce Partner
          </SectionLabel>

          
            <h2
            className="font-normal heading-gradient mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word' }}
          >
            We Build Premium eCommerce Platform That Scale with your Business
          </h2>



          <div className="mt-12 grid gap-3 md:grid-cols-2">

            {finalFeatures.map((feature) => (

              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-[#0f172a]/10 bg-[#fffaf8] px-5 py-4 text-sm font-medium shadow-sm transition-all hover:border-[#FF4800]/30 hover:bg-[#fff5ef]"
              >

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF4800] text-white">

                  <Check size={13} />

                </span>

                {feature}

              </div>

            ))}

          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">

            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#FF4800] px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-[#e64000] hover:scale-[1.02]"
            >

              Build Your Commerce Platform

              <ArrowRight size={17} />

            </a>

            <a
              href="/"
              className="inline-flex items-center gap-3 rounded-full border border-[#0f172a]/15 bg-white px-7 py-4 text-sm font-semibold transition-all hover:border-[#FF4800] hover:text-[#FF4800]"
            >

              Explore Straveda

            </a>

          </div>

          <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[#0f172a]/10 pt-6 text-[9px] font-bold uppercase tracking-[0.16em] text-[#94a3b8] md:flex-row">

            <span>
              Prepared by Straveda Tech · stravedatech.com
            </span>

            <span>
              Straveda Commerce OS © 2024
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}
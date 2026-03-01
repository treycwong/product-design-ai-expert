"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-[5%] py-[1.1rem]"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        background: "rgba(8,11,18,0.8)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <img
          src="/Verdikt_Logo.png"
          alt="Verdikt AI Logo"
          className="h-8 w-auto object-contain"
        />
        <span
          className="text-[1.15rem] font-bold tracking-tight text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Verdikt <span style={{ color: "#7c5cfc" }}>AI</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {[
          { label: "Features", href: "#features" },
          { label: "How it works", href: "#how" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-[#7a8299] transition-colors hover:text-[#f0f2f8]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <Link
        href="/chat"
        className="inline-flex items-center gap-1.5 rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.4)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#8f6dff] hover:shadow-[0_0_24px_rgba(124,92,252,0.55)]"
      >
        Try free →
      </Link>
    </header>
  );
}

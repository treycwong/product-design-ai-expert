"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#f0f2f8 1px, transparent 1px), linear-gradient(90deg, #f0f2f8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(124,92,252,0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(0,229,195,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Badge */}
      <div
        className="relative mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.8rem]"
        style={{
          borderColor: "rgba(124,92,252,0.3)",
          background: "rgba(124,92,252,0.1)",
          color: "#a990ff",
          animation: "fadeInDown 0.6s ease both",
        }}
      >
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: "#00e5c3" }}
        />
        Powered by Claude, GPT-4 &amp; Gemini — simultaneously
      </div>

      {/* Headline */}
      <h1
        className="relative mx-auto mb-6 max-w-[880px] font-extrabold leading-[1.1] text-white"
        style={{
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          letterSpacing: "-0.02em",
          animation: "fadeInUp 0.7s 0.15s ease both",
        }}
      >
        Multi <span style={{ color: "#7c5cfc" }}>AI Review</span>
        <br />
        for your <span style={{ color: "#00e5c3" }}>Design</span>
      </h1>

      {/* Subheading */}
      <p
        className="relative mx-auto mb-10 max-w-[560px] font-light leading-relaxed"
        style={{
          fontSize: "1.15rem",
          color: "#7a8299",
          animation: "fadeInUp 0.7s 0.3s ease both",
        }}
      >
        Stop guessing if your design works. Verdikt AI gives you structured,
        expert-level critique from three leading AI models in under 10 seconds.
      </p>

      {/* CTA Buttons */}
      <div
        className="relative mb-5 flex flex-wrap items-center justify-center gap-3"
        style={{ animation: "fadeInUp 0.7s 0.45s ease both" }}
      >
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(124,92,252,0.35)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#8f6dff] hover:shadow-[0_0_30px_rgba(124,92,252,0.5)]"
        >
          Try Verdikt AI free →
        </Link>
        <a
          href="#how"
          className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.12)] px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:border-[#7c5cfc] hover:text-[#7c5cfc]"
        >
          See how it works
        </a>
      </div>

      {/* Meta row */}
      <div
        className="relative flex flex-wrap justify-center gap-6 text-[0.8rem]"
        style={{ color: "#7a8299", animation: "fadeInUp 0.7s 0.6s ease both" }}
      >
        {[
          "No sign-up required",
          "Instant results",
          "3 AI models",
          "Export to PDF",
        ].map((item) => (
          <span key={item}>
            <span style={{ color: "#00e5c3" }}>✓ </span>
            {item}
          </span>
        ))}
      </div>

      {/* Mock UI panel */}
      <div
        className="relative mt-16 w-full max-w-[800px]"
        style={{ animation: "fadeInUp 0.9s 0.75s ease both" }}
      >
        {/* Glow behind panel */}
        <div
          className="pointer-events-none absolute -inset-10 rounded-[30px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,92,252,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Window */}
        <div
          className="relative overflow-hidden rounded-2xl border"
          style={{
            background: "#0f1420",
            borderColor: "rgba(255,255,255,0.07)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Window header */}
          <div
            className="flex items-center gap-2 border-b px-5 py-4"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbc2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto text-xs" style={{ color: "#7a8299" }}>
              Verdikt AI · Design Review
            </span>
          </div>

          {/* Tabs */}
          <div
            className="flex border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {[
              { label: "Claude", active: true, teal: false },
              { label: "GPT-4", active: false, teal: false },
              { label: "Gemini", active: false, teal: false },
              { label: "Consensus", active: false, teal: true },
            ].map((tab) => (
              <div
                key={tab.label}
                className="flex-1 py-3 text-center text-[0.8rem]"
                style={{
                  color: tab.teal
                    ? "#00e5c3"
                    : tab.active
                      ? "#f0f2f8"
                      : "#7a8299",
                  background: tab.active
                    ? "rgba(124,92,252,0.1)"
                    : "transparent",
                  borderBottom: tab.active
                    ? "2px solid #7c5cfc"
                    : "2px solid transparent",
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="grid gap-4 p-6">
            {/* Friction Points */}
            <div>
              <div
                className="mb-2 flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-wider"
                style={{ color: "#7a8299" }}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffb432"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                Friction Points
              </div>
              <div
                className="rounded-xl border p-4 text-[0.85rem] leading-relaxed"
                style={{
                  background: "#151c2e",
                  borderColor: "rgba(255,255,255,0.07)",
                  color: "#c8cedf",
                }}
              >
                <span
                  className="mr-2 rounded-full px-2 py-0.5 text-[0.7rem] font-bold"
                  style={{
                    background: "rgba(255,107,107,0.15)",
                    color: "#ff6b6b",
                  }}
                >
                  High
                </span>
                The CTA hierarchy is unclear — &quot;Book Now&quot; and
                &quot;Learn More&quot; carry equal visual weight, reducing
                conversion confidence.
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div
                className="mb-2 flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-wider"
                style={{ color: "#7a8299" }}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7c5cfc"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
                Recommendations
              </div>
              <div
                className="rounded-xl border p-4 text-[0.85rem] leading-relaxed"
                style={{
                  background: "#151c2e",
                  borderColor: "rgba(255,255,255,0.07)",
                  color: "#c8cedf",
                }}
              >
                <span
                  className="mr-2 rounded-full px-2 py-0.5 text-[0.7rem] font-bold"
                  style={{
                    background: "rgba(255,180,50,0.15)",
                    color: "#ffb432",
                  }}
                >
                  Medium
                </span>
                Increase spacing between the pricing tiers. Users struggle to
                compare at a glance — add visual separation and a &quot;Most
                Popular&quot; indicator.
              </div>
            </div>

            {/* Strengths */}
            <div>
              <div
                className="mb-2 flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-wider"
                style={{ color: "#7a8299" }}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#00e5c3"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Strengths
              </div>
              <div
                className="rounded-xl border p-4 text-[0.85rem] leading-relaxed"
                style={{
                  background: "#151c2e",
                  borderColor: "rgba(255,255,255,0.07)",
                  color: "#c8cedf",
                }}
              >
                <span
                  className="mr-2 rounded-full px-2 py-0.5 text-[0.7rem] font-bold"
                  style={{
                    background: "rgba(0,229,195,0.15)",
                    color: "#00e5c3",
                  }}
                >
                  Positive
                </span>
                Strong visual hierarchy in the hero section. The imagery
                effectively communicates the product&apos;s emotional value.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

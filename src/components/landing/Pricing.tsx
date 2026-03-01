import Link from "next/link";

const plans = [
  {
    tier: "Starter",
    price: "$0",
    period: "Free forever",
    desc: "Perfect for individual designers exploring AI-powered critique.",
    features: [
      "5 reviews per month",
      "All 3 AI models",
      "Basic scoring",
      "7-day review history",
    ],
    cta: "Get started free",
    popular: false,
    primary: false,
  },
  {
    tier: "Pro",
    price: "$29",
    period: "per month",
    desc: "For designers who want unlimited access and team sharing.",
    features: [
      "Unlimited reviews",
      "All 3 AI models",
      "Full scoring & breakdown",
      "PDF export",
      "Unlimited history",
      "Context-aware analysis",
    ],
    cta: "Start free trial →",
    popular: true,
    primary: true,
  },
  {
    tier: "Team",
    price: "$79",
    period: "per month",
    desc: "For product teams that want shared history and collaboration.",
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Shared review history",
      "Team dashboards",
      "Priority support",
      "SSO (coming soon)",
    ],
    cta: "Start team trial",
    popular: false,
    primary: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="px-[5%] py-24"
      style={{ background: "#080b12" }}
    >
      <div className="text-center">
        <span
          className="mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#7c5cfc" }}
        >
          Pricing
        </span>
        <h2
          className="mx-auto max-w-[720px] font-extrabold leading-[1.1] text-white"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Simple, transparent pricing
        </h2>
        <p
          className="mx-auto mt-4 max-w-[560px] font-light"
          style={{ color: "#7a8299", fontSize: "1.05rem" }}
        >
          Start for free. Upgrade when you need more reviews or advanced
          features.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[980px] gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className="relative rounded-[20px] border p-9 transition-all duration-300"
            style={{
              background: "#0f1420",
              borderColor: plan.popular ? "#7c5cfc" : "rgba(255,255,255,0.07)",
              boxShadow: plan.popular
                ? "0 0 40px rgba(124,92,252,0.15)"
                : "none",
            }}
          >
            {plan.popular && (
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white"
                style={{ background: "#7c5cfc", whiteSpace: "nowrap" }}
              >
                Most Popular
              </div>
            )}

            <div
              className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em]"
              style={{ color: "#7a8299" }}
            >
              {plan.tier}
            </div>
            <div
              className="font-extrabold leading-none text-white"
              style={{
                fontSize: "2.8rem",
                fontFamily: "var(--font-geist-sans, sans-serif)",
              }}
            >
              {plan.price}
            </div>
            <div className="mb-4 text-[0.85rem]" style={{ color: "#7a8299" }}>
              {plan.period}
            </div>
            <div
              className="mb-6 text-[0.85rem] leading-relaxed"
              style={{ color: "#7a8299" }}
            >
              {plan.desc}
            </div>

            <ul className="mb-8 grid gap-2.5">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-[0.85rem] text-white"
                >
                  <span className="font-bold" style={{ color: "#00e5c3" }}>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* <Link
              href="/chat"
              className="block w-full rounded-[9px] py-3 text-center text-[0.88rem] font-semibold transition-all"
              style={
                plan.primary
                  ? {
                      background: "#7c5cfc",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(124,92,252,0.35)",
                    }
                  : {
                      background: "transparent",
                      color: "#f0f2f8",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }
              }
            >
              {plan.cta}
            </Link> */}
          </div>
        ))}
      </div>
    </section>
  );
}

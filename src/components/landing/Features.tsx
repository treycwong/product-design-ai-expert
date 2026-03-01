"use client";

const features = [
  {
    iconColor: "#7c5cfc",
    iconBg: "rgba(124,92,252,0.15)",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#7c5cfc"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Multi-Model Consensus",
    desc: "Claude, GPT-4, and Gemini review your design simultaneously and synthesize their perspectives into a single, high-confidence verdict.",
  },
  {
    iconColor: "#00e5c3",
    iconBg: "rgba(0,229,195,0.12)",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#00e5c3"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Instant Feedback",
    desc: "No waiting, no scheduling. Get richly structured critique with severity ratings, reasoning, and specific recommendations in seconds.",
  },
  {
    iconColor: "#ff6b6b",
    iconBg: "rgba(255,107,107,0.12)",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#ff6b6b"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    title: "Export PDF Reports",
    desc: "Turn any Verdikt session into a polished PDF report. Share with stakeholders, clients, or your engineering team in one click.",
  },
  {
    iconColor: "#ffb432",
    iconBg: "rgba(255,180,50,0.12)",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#ffb432"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
        />
      </svg>
    ),
    title: "Context-Aware Analysis",
    desc: "Give Verdikt context — your target audience, design goals, constraints — and receive feedback tailored to your specific product.",
  },
  {
    iconColor: "#7c5cfc",
    iconBg: "rgba(124,92,252,0.15)",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#7c5cfc"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3"
        />
      </svg>
    ),
    title: "Structured Scoring",
    desc: "Every review produces a scorecard — usability, clarity, visual hierarchy, accessibility — so you can track improvements over time.",
  },
  {
    iconColor: "#00e5c3",
    iconBg: "rgba(0,229,195,0.12)",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#00e5c3"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
    title: "Review History",
    desc: "Every session is saved so you can revisit, compare across iterations, and build a living record of your product's design evolution.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="px-[5%] py-24"
      style={{
        background: "#0f1420",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="text-center">
        <span
          className="mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#7c5cfc" }}
        >
          Features
        </span>
        <h2
          className="mx-auto max-w-[720px] font-extrabold leading-[1.1] text-white"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Everything for smarter design decisions
        </h2>
        <p
          className="mx-auto mt-4 max-w-[560px] font-light"
          style={{ color: "#7a8299", fontSize: "1.05rem" }}
        >
          Verdikt doesn&apos;t just give you one opinion — it gives you
          consensus from the world&apos;s leading AI models, structured for
          product teams.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feat) => (
          <div
            key={feat.title}
            className="feat-card cursor-default rounded-2xl border p-7 transition-all duration-300"
            style={{
              background: "#080b12",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: feat.iconBg }}
            >
              {feat.icon}
            </div>
            <h3 className="mb-2 text-base font-bold text-white">
              {feat.title}
            </h3>
            <p
              className="text-[0.85rem] leading-relaxed"
              style={{ color: "#7a8299" }}
            >
              {feat.desc}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .feat-card:hover {
          border-color: rgba(124, 92, 252, 0.4) !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}

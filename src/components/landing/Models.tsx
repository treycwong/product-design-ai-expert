const models = [
  {
    id: "claude",
    iconColor: "#7c5cfc",
    borderAccent: "#7c5cfc",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#7c5cfc"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    name: "Claude (Anthropic)",
    role: "Information Architecture & Reasoning Specialist",
    quote:
      '"The information architecture creates friction at the key decision point — users are forced to process too much before being given the primary CTA."',
  },
  {
    id: "gpt4",
    iconColor: "#00e5c3",
    borderAccent: "#00e5c3",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#00e5c3"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
        />
      </svg>
    ),
    name: "GPT-4 (OpenAI)",
    role: "Visual Hierarchy & Conversion Specialist",
    quote:
      '"Strong visual hierarchy in the hero, but the CTA lacks sufficient contrast and urgency. Consider a more directive copy approach and higher contrast button state."',
  },
  {
    id: "gemini",
    iconColor: "#ff6b6b",
    borderAccent: "#ff6b6b",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#ff6b6b"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
    name: "Gemini (Google)",
    role: "Usability & Accessibility Specialist",
    quote:
      '"Progressive disclosure is underutilized — first-time users are overwhelmed on load. Surface the core value action before revealing secondary features."',
  },
];

export function Models() {
  return (
    <section className="px-[5%] py-24" style={{ background: "#080b12" }}>
      <div className="text-center">
        <span
          className="mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#7c5cfc" }}
        >
          The Panel
        </span>
        <h2
          className="mx-auto max-w-[720px] font-extrabold leading-[1.1] text-white"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Three expert perspectives, one unified verdict
        </h2>
        <p
          className="mx-auto mt-4 max-w-[560px] font-light"
          style={{ color: "#7a8299", fontSize: "1.05rem" }}
        >
          Each model brings its own strengths. Together, they cover what no
          single reviewer ever could.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {models.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "#0f1420",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div className="mb-4">{m.icon}</div>
            <div
              className="mb-1 text-base font-bold text-white"
              style={{ fontFamily: "var(--font-geist-sans, sans-serif)" }}
            >
              {m.name}
            </div>
            <div className="mb-5 text-[0.78rem]" style={{ color: "#7a8299" }}>
              {m.role}
            </div>
            <div
              className="border-l-2 pl-3 text-[0.85rem] italic leading-relaxed"
              style={{
                borderColor: m.borderAccent,
                color: "#c8cedf",
              }}
            >
              {m.quote}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

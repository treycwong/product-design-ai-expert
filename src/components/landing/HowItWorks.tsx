const steps = [
  {
    num: "01",
    title: "Upload your design",
    desc: "Paste a screenshot, share a Figma link, or describe your design in plain English. Verdikt accepts any format.",
  },
  {
    num: "02",
    title: "Three AIs analyze simultaneously",
    desc: "Claude, GPT-4, and Gemini each review your design independently — no groupthink, no bias from shared context.",
  },
  {
    num: "03",
    title: "Get your structured verdict",
    desc: "Receive a scored, prioritized breakdown of strengths, friction points, accessibility issues, and clear next steps — plus a synthesized consensus from all three models.",
    last: true,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="px-[5%] py-24"
      style={{ background: "#080b12" }}
    >
      <div className="text-center">
        <span
          className="mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#7c5cfc" }}
        >
          How it works
        </span>
        <h2
          className="mx-auto max-w-[720px] font-extrabold leading-[1.1] text-white"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          From upload to insight in three steps
        </h2>
        <p
          className="mx-auto mt-4 max-w-[560px] font-light"
          style={{ color: "#7a8299", fontSize: "1.05rem" }}
        >
          No prompting expertise required. Just paste or upload your design and
          let Verdikt handle the rest.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="relative rounded-2xl border p-8"
            style={{
              background: "#0f1420",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="mb-5 flex h-9 w-9 items-center justify-center rounded-[10px] text-sm font-black text-white"
              style={{
                background: "linear-gradient(135deg, #7c5cfc, #5a3fd4)",
                boxShadow: "0 0 15px rgba(124,92,252,0.35)",
                fontFamily: "var(--font-geist-sans, sans-serif)",
              }}
            >
              {step.num}
            </div>
            <h3 className="mb-2 text-[1.1rem] font-bold text-white">
              {step.title}
            </h3>
            <p className="text-[0.88rem]" style={{ color: "#7a8299" }}>
              {step.desc}
            </p>

            {/* Connector arrow */}
            {!step.last && (
              <div
                className="absolute -right-3 top-10 hidden items-center md:flex"
                style={{ width: "1.5rem" }}
              >
                <div
                  className="h-px w-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <span
                  className="absolute -right-1 text-xs"
                  style={{ color: "#7a8299", top: "-7px" }}
                >
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

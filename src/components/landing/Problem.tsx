const problems = [
  {
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
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Senior designers are busy",
    desc: "Design reviews get scheduled days out. You're blocked waiting for feedback that could take minutes.",
  },
  {
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
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Consultants are expensive",
    desc: "External UX consultants charge $200–400/hr. Not every iteration deserves that budget.",
  },
  {
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
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Single perspectives miss issues",
    desc: "One reviewer brings one set of biases. Critical issues get missed because no one perspective is complete.",
  },
  {
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
          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
        />
      </svg>
    ),
    title: "Generic feedback isn't actionable",
    desc: '"It looks good" doesn\'t help you ship better product. You need specific, structured, prioritized critique.',
  },
];

export function Problem() {
  return (
    <section
      className="px-[5%] py-24 text-center"
      style={{
        background: "linear-gradient(180deg, #080b12 0%, #0f1420 100%)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span
        className="mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
        style={{ color: "#7c5cfc" }}
      >
        The Problem
      </span>
      <h2
        className="mx-auto max-w-[720px] font-extrabold leading-[1.1] text-white"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Good design feedback is rare, expensive, and slow
      </h2>
      <p
        className="mx-auto mt-4 max-w-[560px] font-light"
        style={{ color: "#7a8299", fontSize: "1.05rem" }}
      >
        Design reviews shouldn&apos;t depend on finding the right person at the
        right time. Verdikt AI makes expert critique instant and always
        available.
      </p>

      <div className="mx-auto mt-12 grid max-w-[900px] gap-4 sm:grid-cols-2">
        {problems.map((p) => (
          <div
            key={p.title}
            className="flex items-start gap-4 rounded-2xl border p-6 text-left"
            style={{
              background: "#080b12",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div className="mt-0.5 shrink-0">{p.icon}</div>
            <div>
              <div className="mb-1.5 text-[0.95rem] font-semibold text-white">
                {p.title}
              </div>
              <div className="text-[0.85rem]" style={{ color: "#7a8299" }}>
                {p.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

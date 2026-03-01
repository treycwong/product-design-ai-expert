import Link from "next/link";

export function CtaBanner() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-32 text-center"
      style={{ background: "#080b12" }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,92,252,0.12) 0%, transparent 70%)",
        }}
      />

      <span
        className="relative mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
        style={{ color: "#7c5cfc" }}
      >
        Get started
      </span>

      <h2
        className="relative mx-auto max-w-[700px] font-extrabold leading-[1.1] text-white"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Ready for smarter{" "}
        <span style={{ color: "#7c5cfc" }}>design decisions</span>?
      </h2>

      <p
        className="relative mx-auto mt-6 max-w-[500px] font-light"
        style={{ color: "#7a8299" }}
      >
        Start a conversation with Verdikt AI right now. No sign-up, no waiting —
        just instantly better product feedback.
      </p>

      <Link
        href="/chat"
        className="relative mt-10 inline-flex items-center gap-2 rounded-xl px-10 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: "#7c5cfc",
          boxShadow: "0 0 20px rgba(124,92,252,0.35)",
        }}
      >
        Try Verdikt AI free →
      </Link>

      <div
        className="relative mt-5 flex flex-wrap items-center justify-center gap-6 text-[0.8rem]"
        style={{ color: "#7a8299" }}
      >
        {[
          "Three AI models",
          "Instant analysis",
          "Export to PDF",
          "No credit card required",
        ].map((item) => (
          <span key={item}>
            <span style={{ color: "#00e5c3" }}>✓ </span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

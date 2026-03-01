const logos = ["Figma", "Linear", "Loom", "Notion", "Vercel", "Stripe"];

export function LogosBar() {
  return (
    <div
      className="px-[5%] py-16 text-center"
      style={{ background: "#080b12" }}
    >
      <p
        className="mb-8 text-[0.8rem] font-semibold uppercase tracking-[0.1em]"
        style={{ color: "#7a8299" }}
      >
        Trusted by designers at world-class teams
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 opacity-35">
        {logos.map((logo) => (
          <span
            key={logo}
            className="text-[1.1rem] font-bold text-white"
            style={{
              fontFamily: "var(--font-geist-sans, sans-serif)",
              whiteSpace: "nowrap",
            }}
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

const stats = [
  { value: "3", label: "AI models per review" },
  { value: "<10s", label: "Feedback delivery" },
  { value: "100%", label: "Design focused" },
  { value: "∞", label: "Iteration cycles" },
];

export function StatsBar() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "#0f1420",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center px-6 py-8 text-center"
          style={{
            borderRight:
              i < stats.length - 1
                ? "1px solid rgba(255,255,255,0.07)"
                : "none",
          }}
        >
          <div
            className="text-[2.2rem] font-extrabold leading-none"
            style={{
              background: "linear-gradient(135deg, #7c5cfc, #00e5c3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat.value}
          </div>
          <div className="mt-1.5 text-[0.82rem]" style={{ color: "#7a8299" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-[#0d0d15] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Text */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
              About Verdikt AI
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              The design review{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                your team always needed
              </span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Getting quality design feedback is hard. Senior designers are
                busy, external consultants are expensive, and peer reviews
                surface different opinions with no clear path forward. Verdikt
                AI changes that.
              </p>
              <p>
                By querying Claude (Anthropic), GPT-4 (OpenAI), and Gemini
                (Google) simultaneously and synthesising their analysis, Verdikt
                AI delivers structured, multi-perspective design critique that
                no single model — or single human — could provide alone.
              </p>
              <p>
                Whether you&apos;re iterating on a checkout flow, validating a
                new onboarding experience, or pressure-testing a full product
                redesign, Verdikt AI gives your team the confidence to make
                faster, better-informed design decisions.
              </p>
            </div>

            {/* Metrics row */}
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "3", label: "AI models per review" },
                { value: "<10s", label: "Feedback delivery" },
                { value: "100%", label: "Design focused" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card stack */}
          <div className="relative h-80 lg:h-[420px]">
            {/* Background blob */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/10 to-indigo-600/5" />

            {/* Model cards */}
            <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6">
              {[
                {
                  name: "Claude",
                  from: "Anthropic",
                  color: "from-amber-500/20 to-orange-500/10",
                  border: "border-amber-500/30",
                  dot: "bg-amber-400",
                  verdict:
                    "The information architecture creates friction at the key decision point.",
                },
                {
                  name: "GPT-4",
                  from: "OpenAI",
                  color: "from-emerald-500/20 to-teal-500/10",
                  border: "border-emerald-500/30",
                  dot: "bg-emerald-400",
                  verdict:
                    "Strong visual hierarchy, but the CTA lacks contrast and urgency.",
                },
                {
                  name: "Gemini",
                  from: "Google",
                  color: "from-sky-500/20 to-blue-600/10",
                  border: "border-sky-500/30",
                  dot: "bg-sky-400",
                  verdict:
                    "Consider progressive disclosure to reduce cognitive load on first use.",
                },
              ].map((model) => (
                <div
                  key={model.name}
                  className={`rounded-xl border ${model.border} bg-gradient-to-r ${model.color} p-4 backdrop-blur-sm`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${model.dot}`} />
                    <span className="text-sm font-semibold text-white">
                      {model.name}
                    </span>
                    <span className="text-xs text-zinc-500">
                      · {model.from}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300">{model.verdict}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

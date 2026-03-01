"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is Verdikt different from just asking ChatGPT to review my design?",
    a: "Verdikt queries three separate models simultaneously with UX-specific prompting frameworks, then synthesizes their responses into a structured verdict with severity ratings. You get the breadth of multiple expert opinions, formatted for action — not a single opinion in a chat window.",
  },
  {
    q: "What file formats does Verdikt accept?",
    a: "Verdikt accepts screenshots (PNG, JPG, WebP), Figma share links, and plain-text design descriptions. PDF support is coming soon. You can also describe a user flow or interaction pattern and get conceptual feedback.",
  },
  {
    q: "Is my design data kept private?",
    a: "Yes. Your uploads are never used to train any AI model. Designs are processed in-memory and stored only in your account history, which you can delete at any time. We do not share your data with third parties.",
  },
  {
    q: "Can I use Verdikt for non-digital design — like print or marketing materials?",
    a: "Verdikt is primarily optimized for digital product design (web apps, mobile apps, landing pages). While it can review print materials, the feedback framework is calibrated for UX, usability, and conversion — so results may be less structured for non-digital contexts.",
  },
  {
    q: "How do I cancel or change my plan?",
    a: "You can upgrade, downgrade, or cancel your plan at any time from your account settings. If you cancel, you'll retain access until the end of your billing period. No questions asked.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="px-[5%] py-24"
      style={{
        background: "#0f1420",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="text-center">
        <span
          className="mb-4 block text-[0.75rem] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#7c5cfc" }}
        >
          FAQ
        </span>
        <h2
          className="mx-auto max-w-[720px] font-extrabold leading-[1.1] text-white"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Common questions
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-[700px] gap-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border"
            style={{
              background: "#080b12",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[0.95rem] font-medium text-white transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {faq.q}
              <span
                className="shrink-0 text-xl transition-transform duration-300"
                style={{
                  color: "#7a8299",
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  display: "inline-block",
                }}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div
                className="px-6 pb-5 text-[0.88rem] leading-relaxed"
                style={{ color: "#7a8299" }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

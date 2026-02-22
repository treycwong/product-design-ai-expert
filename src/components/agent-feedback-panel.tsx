import ReactMarkdown from "react-markdown";
import type { AgentFeedback } from "@/lib/supabase/database.types";

const sections: { key: keyof AgentFeedback; label: string }[] = [
  { key: "pros", label: "✅ Pros" },
  { key: "friction_points", label: "⚠️ Friction Points" },
  { key: "accessibility_issues", label: "♿ Accessibility Issues" },
  { key: "recommendations", label: "💡 Recommendations" },
];

export function AgentFeedbackPanel({
  feedback,
}: {
  feedback: AgentFeedback | undefined | null;
}) {
  if (!feedback) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No feedback available for this model.
      </p>
    );
  }

  if (feedback.error) {
    return (
      <p className="text-sm text-destructive">
        This model encountered an error: {feedback.error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map(({ key, label }) => (
        <div key={key}>
          <h4 className="mb-2 text-sm font-semibold">{label}</h4>
          <ul className="space-y-1">
            {(feedback[key] as string[]).map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                <ReactMarkdown>{item}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

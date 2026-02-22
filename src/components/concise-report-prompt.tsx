"use client";

import { useState } from "react";
import { CopyPlus, Download, CheckCircle2 } from "lucide-react";
import type { MultiAgentFeedback } from "@/lib/supabase/database.types";
import { generateConcisePDF } from "@/lib/report/pdf-generator";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface ConciseReportPromptProps {
  messageId: string;
  feedback: MultiAgentFeedback;
  productContext: string;
  hasGeneratedPreviously: boolean;
}

export function ConciseReportPrompt({
  messageId,
  feedback,
  productContext,
  hasGeneratedPreviously,
}: ConciseReportPromptProps) {
  const [hasGenerated, setHasGenerated] = useState(hasGeneratedPreviously);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      await generateConcisePDF(feedback, productContext);

      // Save state to the database so we remember next time they load the chat
      if (!hasGeneratedPreviously) {
        const supabase = createSupabaseBrowserClient();
        await supabase
          .from("messages")
          .update({ audit_report: { type: "concise" } })
          .eq("id", messageId);
      }

      setHasGenerated(true);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  if (hasGenerated) {
    return (
      <div className="flex justify-start">
        <div className="mt-4 border border-green-100 rounded-lg px-4 py-3 max-w-[85%] bg-green-50/50 flex flex-col gap-3 shadow-sm">
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="font-semibold text-sm text-green-900">
                Here is your Feedback Report
              </p>
              <p className="text-xs text-green-700/80">
                Synthesized directly from agent evaluations.
              </p>
            </div>
            <button
              type="button"
              className="ml-4 gap-2 border border-green-200 text-green-800 bg-transparent hover:bg-green-100 hover:text-green-900 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-3"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Download className="w-4 h-4" /> Download Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="mt-4 border border-indigo-100 rounded-lg px-4 py-3 max-w-[85%] bg-indigo-50/50 flex items-center justify-between gap-4 shadow-sm">
        <p className="text-sm font-medium text-indigo-900">
          Generate a concatenated PDF report from these evaluations?
        </p>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 whitespace-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-3"
        >
          {isGenerating ? (
            <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <CopyPlus className="w-4 h-4" />
          )}
          Yes, Generate Report
        </button>
      </div>
    </div>
  );
}

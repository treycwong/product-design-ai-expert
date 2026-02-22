"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AgentFeedbackPanel } from "@/components/agent-feedback-panel";
import type { MultiAgentFeedback } from "@/lib/supabase/database.types";

interface FeedbackTabsProps {
  feedback: MultiAgentFeedback;
}

export function FeedbackTabs({ feedback }: FeedbackTabsProps) {
  return (
    <Tabs defaultValue="openai" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="openai">OpenAI</TabsTrigger>
        <TabsTrigger value="claude">Claude</TabsTrigger>
        <TabsTrigger value="gemini">Gemini</TabsTrigger>
      </TabsList>

      <TabsContent value="openai" className="mt-4">
        <AgentFeedbackPanel feedback={feedback.openai} />
      </TabsContent>

      <TabsContent value="claude" className="mt-4">
        <AgentFeedbackPanel feedback={feedback.claude} />
      </TabsContent>

      <TabsContent value="gemini" className="mt-4">
        <AgentFeedbackPanel feedback={feedback.gemini} />
      </TabsContent>
    </Tabs>
  );
}

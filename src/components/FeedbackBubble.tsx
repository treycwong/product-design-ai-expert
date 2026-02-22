import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiAgentFeedback, FeedbackData } from "@/types/database";
import ReactMarkdown from "react-markdown";

export default function FeedbackBubble({
  feedback,
}: {
  feedback: MultiAgentFeedback;
}) {
  const renderFeedback = (data?: FeedbackData) => {
    if (!data)
      return (
        <p className="text-gray-500 italic text-sm">
          No feedback provided by this model.
        </p>
      );

    return (
      <div className="space-y-6 text-sm">
        {data.pros && data.pros.length > 0 && (
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {data.pros.map((p, i) => (
                <li key={i}>
                  <ReactMarkdown>{p}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.friction_points && data.friction_points.length > 0 && (
          <div>
            <h4 className="font-semibold text-red-700 mb-2">Friction Points</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {data.friction_points.map((p, i) => (
                <li key={i}>
                  <ReactMarkdown>{p}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.accessibility_issues && data.accessibility_issues.length > 0 && (
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">
              Accessibility Issues
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {data.accessibility_issues.map((p, i) => (
                <li key={i}>
                  <ReactMarkdown>{p}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.recommendations && data.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              Recommendations
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {data.recommendations.map((p, i) => (
                <li key={i}>
                  <ReactMarkdown>{p}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5 w-full max-w-3xl">
      <Tabs defaultValue="openai" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="openai"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            OpenAI (GPT-4o)
          </TabsTrigger>
          <TabsTrigger
            value="claude"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Claude 4.5 Haiku
          </TabsTrigger>
          <TabsTrigger
            value="gemini"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Gemini 2.5 Flash
          </TabsTrigger>
        </TabsList>
        <TabsContent value="openai" className="mt-0 outline-none">
          {renderFeedback(feedback.openai)}
        </TabsContent>
        <TabsContent value="claude" className="mt-0 outline-none">
          {renderFeedback(feedback.claude)}
        </TabsContent>
        <TabsContent value="gemini" className="mt-0 outline-none">
          {renderFeedback(feedback.gemini)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

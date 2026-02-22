export interface Thread {
  id: string; // UUID
  title: string;
  created_at: string; // Timestamptz
}

export interface FeedbackData {
  pros: string[];
  friction_points: string[];
  accessibility_issues: string[];
  recommendations: string[];
}

export interface MultiAgentFeedback {
  openai?: FeedbackData;
  claude?: FeedbackData;
  gemini?: FeedbackData;
}

export interface Message {
  id: string; // UUID
  thread_id: string; // UUID
  role: "user" | "assistant";
  user_content: string | null;
  image_urls: string[] | null;
  multi_agent_feedback: MultiAgentFeedback | null;
  created_at: string; // Timestamptz
}

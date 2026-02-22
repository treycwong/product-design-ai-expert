export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface AgentFeedback {
  pros: string[];
  friction_points: string[];
  accessibility_issues: string[];
  recommendations: string[];
  error?: string;
}

export interface MultiAgentFeedback {
  openai: AgentFeedback;
  claude: AgentFeedback;
  gemini: AgentFeedback;
}

export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          created_at: string;
          id: string;
          image_urls: string[] | null;
          multi_agent_feedback: any;
          role: string;
          thread_id: string;
          user_content: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_urls?: string[] | null;
          multi_agent_feedback?: any;
          audit_report?: any | null;
          role: string;
          thread_id: string;
          user_content?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_urls?: string[] | null;
          multi_agent_feedback?: any;
          audit_report?: any | null;
          role?: string;
          thread_id?: string;
          user_content?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "threads";
            referencedColumns: ["id"];
          },
        ];
      };
      threads: {
        Row: {
          created_at: string;
          id: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type ThreadRow = Database["public"]["Tables"]["threads"]["Row"];
export type MessageRow = Database["public"]["Tables"]["messages"]["Row"] & {
  multi_agent_feedback: MultiAgentFeedback | null;
  audit_report: AuditReport | null;
};

// ── Supervisor Report Types ───────────────────────────────────────────────────

export interface AuditFinding {
  severity: "critical" | "major" | "minor" | "suggestion";
  heuristic: string; // e.g. "Nielsen #4: Consistency and Standards"
  finding: string; // Concise description of the issue
  evidence: string; // What specifically was observed in the UI
  recommendation: string; // Specific, actionable fix
  consensus: "all_three" | "two_of_three" | "single_agent";
}

export interface AuditSection {
  score: number; // 0-100
  summary: string; // 2-3 sentence synthesis
  key_findings: AuditFinding[];
}

export interface AuditReport {
  overall_score: number; // 0-100 weighted composite
  executive_summary: string; // 3-5 sentence overview for stakeholders
  product_context: string; // Restated user context, confirmed by supervisor
  methodology: string; // Brief note on the 3-agent heuristic approach
  sections: {
    visual_design: AuditSection;
    usability: AuditSection;
    accessibility: AuditSection;
    information_architecture: AuditSection;
    interaction_design: AuditSection;
  };
  consensus_wins: string[]; // Items all three agents agreed were positive
  consensus_issues: string[]; // Items all three agents agreed were problematic
  conflicting_opinions: string[]; // Meaningful disagreements between agents
  priority_action_plan: {
    immediate: string[]; // Fix within this sprint
    short_term: string[]; // Fix within 30 days
    long_term: string[]; // Roadmap items
  };
  generated_at: string; // ISO timestamp
}

// ── Update AssistantMessageRow ────────────────────────────────────────────────
// Replace the existing AssistantMessageRow type with this updated version:

export type AssistantMessageRow = {
  id: string;
  thread_id: string;
  role: "assistant";
  user_content: null;
  image_urls: null;
  multi_agent_feedback: MultiAgentFeedback;
  audit_report: AuditReport | null; // null on legacy rows pre-Phase 3
  created_at: string;
};

// UserMessageRow also needs the new column (always null for user rows):
export type UserMessageRow = {
  id: string;
  thread_id: string;
  role: "user";
  user_content: string;
  image_urls: string[];
  multi_agent_feedback: null;
  audit_report: null;
  created_at: string;
};

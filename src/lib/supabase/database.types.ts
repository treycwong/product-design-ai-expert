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
          role: string;
          thread_id: string;
          user_content?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_urls?: string[] | null;
          multi_agent_feedback?: any;
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
};

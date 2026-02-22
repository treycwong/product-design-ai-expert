import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ChatArea } from "@/components/chat-area";
import type { MessageRow } from "@/lib/supabase/database.types";

interface ThreadPageProps {
  params: { threadId: string };
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const supabase = await createSupabaseServerClient();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("thread_id", params.threadId)
    .order("created_at", { ascending: true });

  if (error || messages === null) notFound();

  return (
    <ChatArea
      initialMessages={messages as MessageRow[]}
      threadId={params.threadId}
    />
  );
}

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runFeedbackGraph } from "@/lib/agents/feedbackGraph";
import { HumanMessage } from "@langchain/core/messages";
import { revalidatePath } from "next/cache";

export const maxDuration = 60;
export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const text =
      (formData.get("text") as string) || (formData.get("context") as string);
    const threadId = formData.get("threadId") as string | null;
    const imageFiles = formData.getAll("images") as File[];

    if (!text?.trim()) {
      return Response.json(
        { error: "Text content is required." },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServerClient();

    let resolvedThreadId: string;

    if (threadId) {
      const { data: existingThread, error } = await supabase
        .from("threads")
        .select("id")
        .eq("id", threadId)
        .single();

      if (error || !existingThread) {
        return Response.json({ error: "Thread not found." }, { status: 404 });
      }
      resolvedThreadId = threadId;
    } else {
      const title = text.length > 50 ? `${text.slice(0, 50)}…` : text;
      const { data: newThread, error } = await supabase
        .from("threads")
        .insert({ title })
        .select()
        .single();

      if (error || !newThread) {
        return Response.json(
          { error: "Failed to create thread." },
          { status: 500 },
        );
      }
      resolvedThreadId = newThread.id;
    }

    const imageUrls: string[] = [];
    for (const file of imageFiles.slice(0, 5)) {
      const fileName = `${resolvedThreadId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      const { error: uploadError } = await supabase.storage
        .from("ui_flows")
        .upload(fileName, file, { contentType: file.type });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("ui_flows")
          .getPublicUrl(fileName);
        imageUrls.push(publicUrlData.publicUrl);
      }
    }

    const { data: userMessage, error: userMsgError } = await supabase
      .from("messages")
      .insert({
        thread_id: resolvedThreadId,
        role: "user",
        user_content: text,
        image_urls: imageUrls,
        multi_agent_feedback: null,
      })
      .select()
      .single();

    if (userMsgError || !userMessage) {
      return Response.json(
        { error: "Failed to save user message." },
        { status: 500 },
      );
    }

    const feedbackResult = await runFeedbackGraph({
      text,
      imageUrls,
      threadId: resolvedThreadId,
    });

    const { data: assistantMessage, error: asstMsgError } = await supabase
      .from("messages")
      .insert({
        thread_id: resolvedThreadId,
        role: "assistant",
        user_content: null,
        image_urls: null,
        multi_agent_feedback: feedbackResult,
        audit_report: null,
      })
      .select()
      .single();

    if (asstMsgError || !assistantMessage) {
      return Response.json(
        { error: "Failed to save assistant message." },
        { status: 500 },
      );
    }

    return Response.json({
      threadId: resolvedThreadId,
      userMessage,
      assistantMessage,
    });
  } catch (err: any) {
    console.error("[/api/chat] Unhandled error:", err);
    return Response.json(
      { error: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return Response.json({ error: "threadId is required" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // Manually delete messages to avoid FK constraint issues if ON DELETE CASCADE is missing
    const { error: msgError } = await supabase
      .from("messages")
      .delete()
      .eq("thread_id", threadId);

    if (msgError) {
      console.error("[/api/chat DELETE] Error deleting messages:", msgError);
    }

    const { error } = await supabase
      .from("threads")
      .delete()
      .eq("id", threadId);

    if (error) {
      console.error("[/api/chat DELETE] Error deleting thread:", error);
      return Response.json(
        { error: "Failed to delete thread" },
        { status: 500 },
      );
    }

    revalidatePath("/", "layout");

    return Response.json({ success: true });
  } catch (err: any) {
    console.error("[/api/chat DELETE] Unhandled error:", err);
    return Response.json(
      { error: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}

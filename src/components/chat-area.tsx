/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FeedbackTabs } from "@/components/feedback-tabs";
import { ConciseReportPrompt } from "./concise-report-prompt";
import type { MessageRow } from "@/lib/supabase/database.types";
import { ImageIcon } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface ChatAreaProps {
  initialMessages: MessageRow[];
  threadId: string | null;
}

export function ChatArea({ initialMessages, threadId }: ChatAreaProps) {
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!threadId) return;

    const supabase = createSupabaseBrowserClient();

    // Subscribe to updates on the messages table for this thread
    const channel = supabase
      .channel(`room:${threadId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          const updatedMessage = payload.new as MessageRow;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === updatedMessage.id ? updatedMessage : msg,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files.filter((file) => {
        const isImage =
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/webp";
        const isUnder5MB = file.size <= 5 * 1024 * 1024;
        return isImage && isUnder5MB;
      });

      if (validFiles.length !== files.length) {
        setErrorText(
          "Some files were rejected. Must be PNG/JPG/WEBP & under 5MB.",
        );
      } else {
        setErrorText(null);
      }

      setSelectedImages((prev) => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setErrorText(null);

    const formData = new FormData();
    formData.append("text", inputText);
    if (threadId) {
      formData.append("threadId", threadId);
    }
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    const tempUserMessage: MessageRow = {
      id: crypto.randomUUID(),
      thread_id: threadId || "",
      role: "user",
      user_content: inputText,
      image_urls: selectedImages.map((file) => URL.createObjectURL(file)),
      multi_agent_feedback: null,
      audit_report: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    setInputText("");
    setSelectedImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorText(data.error || "Failed to submit.");
        setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
        return;
      }

      if (!threadId) {
        router.push(`/chat/${data.threadId}`);
      }

      router.refresh();

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== tempUserMessage.id),
        data.userMessage,
        data.assistantMessage,
      ]);
    } catch (err) {
      console.error(err);
      setErrorText("An unexpected network error occurred.");
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-between overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>
              Welcome! Start a new session by describing your product feedback
              task or design flow.
            </p>
          </div>
        )}
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[70%] rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                  <p className="text-sm">{message.user_content}</p>
                  {message.image_urls && message.image_urls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.image_urls.map((url) => (
                        <img
                          key={url}
                          src={url}
                          alt="Uploaded UI flow"
                          className="h-20 w-20 rounded object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (message.role === "assistant") {
            return (
              <div key={message.id} className="flex flex-col gap-3">
                <div className="flex justify-start">
                  <div className="w-full max-w-[85%] rounded-lg border bg-card px-4 py-3 shadow-sm">
                    {message.multi_agent_feedback ? (
                      <FeedbackTabs feedback={message.multi_agent_feedback} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                        <p className="text-sm italic text-muted-foreground">
                          Assistant is thinking...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {message.multi_agent_feedback && (
                  <ConciseReportPrompt
                    messageId={message.id}
                    feedback={message.multi_agent_feedback}
                    productContext={
                      messages.find((m) => m.role === "user")?.user_content ||
                      ""
                    }
                    hasGeneratedPreviously={
                      (message.audit_report as any)?.type === "concise"
                    }
                  />
                )}
              </div>
            );
          }
          return null;
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg border bg-card px-4 py-3 shadow-sm">
              <p className="text-sm italic text-muted-foreground animate-pulse">
                Assistant is thinking...
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t bg-background p-4">
        {errorText && (
          <p className="mb-2 text-sm text-destructive">{errorText}</p>
        )}
        {selectedImages.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedImages.map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-12 w-12 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 overflow-hidden rounded-md border bg-muted/50 focus-within:ring-1 focus-within:ring-ring">
            <textarea
              className="w-full resize-none bg-transparent p-3 text-sm outline-none"
              rows={2}
              placeholder="Describe what you want feedback on..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer rounded-md border p-2 text-sm hover:bg-muted/50 flex items-center justify-center inline-block">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={handleImageChange}
                ref={fileInputRef}
                disabled={isLoading || selectedImages.length >= 5}
              />
            </label>
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

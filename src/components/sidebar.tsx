import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ThreadLink } from "@/components/thread-link";

export async function Sidebar() {
  const supabase = await createSupabaseServerClient();
  const { data: threads } = await supabase
    .from("threads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <aside className="flex w-64 flex-col border-r bg-muted/40 p-4 shrink-0">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Verdikt AI
        </h2>
      </div>
      <Link
        href="/chat"
        className="mb-4 flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        + New Chat
      </Link>
      <nav className="flex flex-col gap-1 overflow-y-auto">
        {threads?.map((thread) => (
          <ThreadLink key={thread.id} thread={thread} />
        ))}
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ThreadRow } from "@/lib/supabase/database.types";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function ThreadLink({ thread }: { thread: ThreadRow }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === `/chat/${thread.id}`;
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/chat?threadId=${thread.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOpen(false);
        router.refresh();
        if (isActive) {
          router.push("/chat");
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error during deletion:", errorData);
        alert(`Error deleting thread: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to delete thread:", error);
      alert("Network error while deleting thread.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className={`group relative flex items-center justify-between truncate rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
          isActive ? "bg-accent font-medium" : "text-muted-foreground"
        }`}
      >
        <Link href={`/chat/${thread.id}`} className="flex-1 truncate pr-6">
          {thread.title}
        </Link>
        <DialogTrigger asChild>
          <button
            type="button"
            className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded text-muted-foreground hover:text-destructive transition-opacity"
            title="Delete thread"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Thread</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="px-4 py-2 text-sm border rounded-md hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

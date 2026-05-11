"use client";

import type { ToolInvocation } from "ai";
import { Loader2 } from "lucide-react";

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

function getLabel(toolName: string, args: Record<string, string>): string {
  const file = args.path ? args.path.split("/").pop() : null;

  if (toolName === "str_replace_editor") {
    switch (args.command) {
      case "create":
        return file ? `Creating ${file}` : "Creating file";
      case "str_replace":
      case "insert":
        return file ? `Editing ${file}` : "Editing file";
      case "view":
        return file ? `Reading ${file}` : "Reading file";
      case "undo_edit":
        return file ? `Undoing edit in ${file}` : "Undoing edit";
    }
  }

  if (toolName === "file_manager") {
    switch (args.command) {
      case "rename":
        return file ? `Renaming ${file}` : "Renaming file";
      case "delete":
        return file ? `Deleting ${file}` : "Deleting file";
    }
  }

  return toolName;
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const { toolName, args, state } = toolInvocation;
  const label = getLabel(toolName, args as Record<string, string>);
  const done = state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {done ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}

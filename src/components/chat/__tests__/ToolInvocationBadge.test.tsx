import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";
import type { ToolInvocation } from "ai";

afterEach(() => {
  cleanup();
});

function makeInvocation(
  toolName: string,
  args: Record<string, string>,
  state: ToolInvocation["state"] = "result"
): ToolInvocation {
  return { toolCallId: "test", toolName, args, state } as ToolInvocation;
}

test("str_replace_editor create shows Creating label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "src/App.tsx" })} />);
  expect(screen.getByText("Creating App.tsx")).toBeDefined();
});

test("str_replace_editor str_replace shows Editing label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "str_replace", path: "src/App.tsx" })} />);
  expect(screen.getByText("Editing App.tsx")).toBeDefined();
});

test("str_replace_editor insert shows Editing label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "insert", path: "src/App.tsx" })} />);
  expect(screen.getByText("Editing App.tsx")).toBeDefined();
});

test("str_replace_editor view shows Reading label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "view", path: "src/App.tsx" })} />);
  expect(screen.getByText("Reading App.tsx")).toBeDefined();
});

test("str_replace_editor undo_edit shows Undoing edit label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "undo_edit", path: "src/App.tsx" })} />);
  expect(screen.getByText("Undoing edit in App.tsx")).toBeDefined();
});

test("file_manager rename shows Renaming label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("file_manager", { command: "rename", path: "src/App.tsx" })} />);
  expect(screen.getByText("Renaming App.tsx")).toBeDefined();
});

test("file_manager delete shows Deleting label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("file_manager", { command: "delete", path: "src/App.tsx" })} />);
  expect(screen.getByText("Deleting App.tsx")).toBeDefined();
});

test("unknown tool falls back to tool name", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("some_tool", {})} />);
  expect(screen.getByText("some_tool")).toBeDefined();
});

test("shows green dot when state is result", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "App.tsx" }, "result")} />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("shows spinner when state is call", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "App.tsx" }, "call")} />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

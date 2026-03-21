import commandList from "$lib/data/commands.json";
import projectsData from "$lib/data/projects.json";
import { goto } from "$app/navigation";
import { terminalHistory } from "$lib/stores.js";

class Stack {
  constructor() { this.items = ["pages"]; }

  push(element) {
    this.items.push(element);
    this.items.push("pages");
  }

  pop() {
    if (this.isEmpty()) return "Stack is empty";
    this.items.pop();
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return "/";
    return this.items[this.items.length - 2];
  }

  clear() {
    this.items = ["pages"];
  }

  toArr() {
    if (this.isEmpty()) return ["/", "pages"];
    return ["/", ...this.items];
  }

  toString() {
    if (this.isEmpty()) return "/";
    const filtered = this.toArr().filter(el => el !== "pages" && el !== "/");
    return "/" + filtered.join("/");
  }

  clone() {
    const newStack = new Stack();
    newStack.items = [...this.items];
    return newStack;
  }

  isEmpty() { return this.items.length === 1; }
  size() { return this.items.length; }
}

const pathStack = new Stack();
let suppressSync = false;

// ── helpers ──────────────────────────────────────────────────────────────────

function isDir(item) {
  return (
    item &&
    typeof item.pages === "object" &&
    item.pages !== null &&
    Object.keys(item.pages).length > 0
  );
}

function getCurrentDir(pathArr) {
  let current = commandList;
  for (const segment of pathArr) {
    if (!current || !(segment in current)) return null;
    current = current[segment];
  }
  return current;
}

// ── public API ────────────────────────────────────────────────────────────────

export async function gotoWithoutSync(path) {
  suppressSync = true;
  await goto(path);
  suppressSync = false;
}

export function syncPathFromUrl(pathname) {
  if (suppressSync) return;
  pathStack.clear();
  const segments = pathname.split("/").filter(Boolean);
  for (const segment of segments) {
    pathStack.push(segment);
  }
}

export async function runCmd(input) {
  const command = input.trim();
  if (!command) return;

  terminalHistory.update((h) => [...h, `> ${command}`]);

  const output = await execute(command);
  if (output === "__CLEAR__") {
    terminalHistory.set([]);
  } else {
    terminalHistory.update((h) => [...h, output]);
  }
}

// ── execute ───────────────────────────────────────────────────────────────────

async function execute(command) {
  const parts = command.split(/\s+/).filter(Boolean);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const foundCmd = commandList.commands.find((c) => c.command === cmd);

  if (!foundCmd) {
    return `Command not found: ${cmd}. Type 'help' for available commands.`;
  }

  if (args.includes("--help")) {
    return foundCmd.usage || "";
  }

  switch (foundCmd.command) {
    case "help":   return handleHelp(args);
    case "ls":     return handleLs();
    case "cat":    return handleCat(args);
    case "q": {goto(pathStack.toString()); return "Quitting..."};
    case "cd":     return handleCd(args);
    case "clear":  return "__CLEAR__";
    case "whoami": return handleWhoami();
    case "pwd":    return handlePwd();
    default:       return `${cmd}: command not implemented`;
  }
}

// ── command handlers ──────────────────────────────────────────────────────────

function handleHelp(args) {
  if (args.length === 0) {
    const lines = [
      "Available commands: (or click any on the right)",
      "",
      ...commandList.commands.map(
        (c) => `  ${c.command.padEnd(8)} - ${c.description}`
      ),
    ];
    return lines.join("\n");
  }

  const cmdName = args[0].toLowerCase();
  const cmd = commandList.commands.find((c) => c.command === cmdName);
  if (!cmd) return `help: no help topics match '${cmdName}'`;
  return `${cmd.command} - ${cmd.description}`;
}

function handleLs() {
  const lines = ["Available pages:", ""];
  const currentDir = {
    "..": { description: "Parent Directory", pages: "" },
    ...getCurrentDir(pathStack.toArr()),
  };

  lines.push(
    ...Object.entries(currentDir).map(([child, item]) => {
      const dir = isDir(item);
      return `  ${child.padEnd(20)} ${dir ? "/" : " "} ${item?.description ?? ""}`;
    })
  );
  return lines.join("\n");
}

async function handleCat(args) {
  if (args.length === 0) {
    const cmd = commandList.commands.find((c) => c.command === "cat");
    return cmd?.usage ?? "";
  }

  // special roots — not applicable to cat
  if (args[0] === "~" || args[0] === "/" || args[0] === "home") {
    return `cat: home: is a directory`;
  }

  if (args[0] === "..") {
    return `cat: ..: is a directory`;
  }

  const currentDir = getCurrentDir(pathStack.toArr());
  if (!currentDir || !(args[0] in currentDir)) {
    return `cat: ${args[0]}: no such file. Type 'ls' to see available pages.`;
  }

  const target = currentDir[args[0]];
  if (isDir(target)) {
    return `cat: ${args[0]}: is a directory (use 'cd' to navigate into it)`;
  }

  const tmpStack = pathStack.clone();
  tmpStack.push(args[0]);
  suppressSync = true;
  await goto(tmpStack.toString());
  suppressSync = false;
  return `Viewing ${args[0]}...`;
}

async function handleCd(args) {
  if (args.length === 0) {
    const cmd = commandList.commands.find((c) => c.command === "cd");
    return cmd?.usage ?? "";
  }

  switch (args[0]) {
    case "~":
    case "/":
    case "home":
      pathStack.clear();
      await goto(pathStack.toString());
      return `Navigating to Home`;

    case "..":
      pathStack.pop();
      await goto(pathStack.toString());
      return `Navigating to ${pathStack.peek()}`;

    default: {
      const currentDir = getCurrentDir(pathStack.toArr());

      if (!currentDir || !(args[0] in currentDir)) {
        return `cd: ${args[0]}: no such directory. Type 'ls' to see available pages.`;
      }

      const target = currentDir[args[0]];
      if (!isDir(target)) {
        return `cd: ${args[0]}: is a file (use 'cat' to view it)`;
      }

      pathStack.push(args[0]);
      await goto(pathStack.toString());
      return `Navigating to ${args[0]}...`;
    }
  }
}

function handleWhoami() {
  const lines = [
    `Name: Logan Watson`,
    `Role: Full Stack Developer`,
    `Location: Your City`,
    "",
    "Type 'ls' to see available pages or 'help' for commands.",
  ];
  return lines.join("\n");
}

function handlePwd() {
  return pathStack.toString();
}
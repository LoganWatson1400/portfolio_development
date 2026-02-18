import commandList from "$lib/data/commands.json";
import projectsData from "$lib/data/projects.json";
import { goto } from "$app/navigation";
import { terminalHistory } from "$lib/stores.js";

class Stack {
  constructor() { this.items = ["/"]; }

  // Push operation
  push(element) { this.items.push(element); }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      return "/";
    }
    return this.items[this.items.length - 1];
  }

  clear() {
    this.items = ["/"]
  }

  toArr() {
    if (this.isEmpty()) return ["/"];
    return [...this.items];
  }

  toString() {
    if (this.isEmpty()) return "";
    return "/" + this.toArr().join("/");
  }

  // isEmpty operation
  isEmpty() { return this.items.length === 1; }

  // Size operation
  size() { return this.items.length; }
}
const pathStack = new Stack();

const navigateToProject = (project) => {
  goto(`/projects/${project.route}`);
};



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
    case "help":
      return handleHelp(args);
    case "ls":
      return handleLs();
    case "cat":
      return handleCat(args);
    case "cd":
      return handleCd(args);
    case "clear":
      return "__CLEAR__";
    case "whoami":
      return handleWhoami();
    case "pwd":
      return handlePwd();
    default:
      return `${cmd}: command not implemented`;
  }
}


function handleHelp(args) {
  if (args.length === 0) {
    const lines = [
      "Available commands: (or click any on the right)",
      "Also try clicking the commands in the right column",
      "",
      ...commandList.commands.map(
        (c) => `  ${c.command.padEnd(8)} - ${c.description}`,
      ),
    ];
    return lines.join("\n");

  } else {
    const cmdName = args[0].toLowerCase();
    const cmd = commandList.commands.find((c) => c.command === cmdName);
    if (!cmd) {
      return `help: no help topics match '${cmdName}'`;
    }
    return `${cmd.command} - ${cmd.description}`;
  }
}

function getCurrentDir(pathArr) {
  let current = commandList;

  for (const segment of pathArr) {
    if (!current || !(segment in current)) return null;
    current = current[segment];
  }
  return current;
}

function handleLs() {
  const lines = ["Available pages:", ""];
  const currentDir = getCurrentDir(pathStack.toArr());

  if (!currentDir) {
    return "Current directory not found";
  }

  const children = Object.keys(currentDir);

  children.forEach((child) => {
    const item = currentDir[child];
    const marker = item && typeof item === "object" ? "/" : "";
    const description = typeof item === "string" ? item : item.description || "";
    lines.push(`  ${child.padEnd(20)} ${marker.padEnd(2)} ${description}`);
  });
  return lines.join("\n");
}

async function handleCd(args) {
  if (args.length === 0) {
    const cmd = commandList.commands.find((c) => c.command === "cd");
    return cmd?.usage;
  }

  switch (args[0]) {
    case "~":
      pathStack.clear();
      await goto(pathStack.toString());
      return `Navigating Home`;
    case "..":
      pathStack.pop();
      await goto(pathStack.toString());
      return `Navigating to ${pathStack.peek()}`;
    default:
      {
        const currentDir = getCurrentDir(pathStack.toArr());

        if (!currentDir || !(args[0] in currentDir)) {
          return `Page not found: ${args[0]}. Type 'ls' to see available pages.`;
        }

        pathStack.push(args[0]);
        await goto(pathStack.toString());
        return `${pathStack.toString()} Navigating to ${args[0]}...`;
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

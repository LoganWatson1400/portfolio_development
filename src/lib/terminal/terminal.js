import commandList from "$lib/data/commands.json";
import projectsData from "$lib/data/projects.json";
import { goto } from "$app/navigation";
import { terminalHistory } from "$lib/stores.js";

class Stack {
  constructor() { this.items = ["pages"]; }

  // Push operation
  push(element) { 
    this.items.push(element); 
    this.items.push("pages");
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    this.items.pop();
    return this.items.pop();
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      return "/";
    }
    return this.items[this.items.length - 2];
  }

  clear() {
    this.items = ["pages"]
  }

  toArr() {
    if (this.isEmpty()) return ["/","pages"];
    return ["/", ...this.items];
  }

  toString() {
    if (this.isEmpty()) return "/";
  
    const filtered = this.toArr().filter(el => el !== "pages" && el !=="/");
    return "/" + filtered.join("/");
  }

  clone() {
    const newStack = new Stack();
    newStack.items = [...this.items];
    return newStack;
  }

  // isEmpty operation
  isEmpty() { return this.items.length === 1; }

  // Size operation
  size() { return this.items.length; }
}
const pathStack = new Stack();

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
  const currentDir = {"..": {"description": "Parent Directory", "pages":""}, ...getCurrentDir(pathStack.toArr())};
  const children = Object.keys(currentDir);

  lines.push(
    ...children.map((child) => {
      const item = currentDir[child];
      const isDir = item && "pages" in item;
      return `  ${child.padEnd(20)} ${isDir ? "/" : " "} ${item?.description ?? ""}`;
    })
  );
  return lines.join("\n");
}

async function handleCat(args) {return handleNav(args, false)}

async function handleCd(args) {return handleNav(args, true)}

async function handleNav(args, updatePath) {
  if (args.length === 0) {
    const cmd = commandList.commands.find((c) => c.command === "cd");
    return cmd?.usage;
  }
  var returnStr;
  var tmpStack;
  if(!updatePath) {
    returnStr = "Viewing"
    tmpStack = pathStack.clone();
  }else{ 
    tmpStack = pathStack;
    returnStr = "Navigating to"
  }

  switch (args[0]) {
    case "~":
    case "/":
    case "home":
      tmpStack.clear();
      await goto(tmpStack.toString());
      return `${returnStr} Home`;
    case "..":
      tmpStack.pop();
      await goto(tmpStack.toString());
      return `${returnStr}  ${tmpStack.peek()}`;
    default:
      {
        const currentDir = getCurrentDir(tmpStack.toArr());

        if (!currentDir || !(args[0] in currentDir)) {
          return `Page not found: ${args[0]}. Type 'ls' to see available pages.`;
        }

        tmpStack.push(args[0]);
        if (updatePath) console.log(tmpStack.toString());
        
        await goto(tmpStack.toString());
        return `${tmpStack.toString()} ${returnStr} ${args[0]}...`;
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

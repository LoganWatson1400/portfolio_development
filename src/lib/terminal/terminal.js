import commandList from "$lib/data/commands.json";
import projectsData from "$lib/data/projects.json";
import { goto } from "$app/navigation";
import { terminalHistory } from "$lib/stores.js";

function formatTemplate(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

let currentPage = "/";

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
    return formatTemplate("Command not found: {command}. Type 'help' for available commands.", { command: cmd });
  }

  // Global --help: always return usage
  if (args.includes("--help")) {
    return foundCmd.usage || "";
  }

  switch (foundCmd.command) {
    case "help":
      return handleHelp(args);
    case "ls":
      return handleLs(); // always verbose
    case "cd":
      return handleCd(args);
    case "clear":
      return "__CLEAR__";
    case "whoami":
      return handleWhoami();
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
      ...commandList.commands.map((c) => `  ${c.command.padEnd(8)} - ${c.description}`)
    ];
    return lines.join("\n");
  } else {
    const cmdName = args[0].toLowerCase();
    const cmd = commandList.commands.find((c) => c.command === cmdName);

    if (!cmd) {
      return `help: no help topics match '${cmdName}'`;
    }

    // Per request: help <cmd> prints description only
    return `${cmd.command} - ${cmd.description}`;
  }
}

function handleLs() {
  const lines = ["Available pages:", ""];

  Object.entries(commandList.pages).forEach(([key, page]) => {
    if (key === "/") return; // Skip root in listing
    const desc = page.description || "";
    lines.push(`  ${page.title.padEnd(20)} ${page.route} ${desc}`);
  });

  return lines.join("\n");
}

async function handleCd(args) {
  if (args.length === 0) {
    const cmd = commandList.commands.find((c) => c.command === "cd");
    return cmd?.usage;
  }

  if (args[0] === "~" || args[0] === "..") {
    currentPage = "/";
    await goto("/");
    return "Navigating to home...";
  }

  const fullPath = args.join(" ");
  
  // Check if it's a dynamic project route (e.g., "projects/weatherdashboard")
  if (fullPath.startsWith("projects/")) {
    const projectSlug = fullPath.split("/")[1];
    const project = projectsData.projects.find(p => p.route === projectSlug);
    
    if (!project) {
      return formatTemplate("Project not found: {project}. Type 'cd projects' to see available projects.", { project: projectSlug });
    }
    
    currentPage = `/projects/${projectSlug}`;
    await goto(`/projects/${projectSlug}`);
    return `Opening ${project.title}...`;
  }

  // Find the page by key or title
  const pageName = args[0].toLowerCase();
  const pageEntry = Object.entries(commandList.pages).find(([key, p]) => {
    const keyMatch = key.toLowerCase() === pageName;
    const titleMatch = (p.title || "").toLowerCase() === pageName;
    return keyMatch || titleMatch;
  });
  const page = pageEntry?.[1];

  if (!page) {
    return formatTemplate("Page not found: {page}. Type 'ls' to see available pages.", { page: pageName });
  }

  currentPage = page.route;
  await goto(page.route);
  return `Navigating to ${page.title}...`;
}

function handleWhoami() {
  const lines = [
    `Name: Logan Watson`,
    `Role: Full Stack Developer`,
    `Location: Your City`,
    "",
    "Type 'ls' to see available pages or 'help' for commands."
  ];
  return lines.join("\n");
}

import { Command } from "./command.js";
import { getCurrentDir } from "$lib/terminal/terminal.js";

export default class Cd extends Command {
  constructor() {
    super({
      name:        "cd",
      usage:       "cd <dir> | cd .. | cd ~",
      description: "Change the current directory and navigate to it",
    });
  }

  async execute({ terminal, args }) {
    if (args.length === 0) return this.usage;

    const target = args[0];

    if (["~", "/"].includes(target)) {
      terminal.clearPath();
      await terminal.navigate(terminal.getPath());
      return "Navigating to /";
    }

    if (target === "..") {
      if (terminal.pathStack.length === 0) return "Already at root";
      terminal.popPath();
      await terminal.navigate(terminal.getPath());
      return `Navigating to ${terminal.getPath()}`;
    }

    const currentDir = getCurrentDir(terminal.pathStack);
    const dirKey = target + "/";

    if (!currentDir || !(dirKey in currentDir)) {
      if (currentDir && target in currentDir) {
        return `cd: ${target}: is a file (use 'cat' to view it)`;
      }
      return `cd: ${target}: no such directory. Type 'ls' to see available pages.`;
    }

    terminal.pushPath(target);
    await terminal.navigate(terminal.getPath());
    return `Navigating to ${target}...`;
  }
}

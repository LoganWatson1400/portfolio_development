import { Command } from "./command.js";
import { getCurrentDir } from "$lib/terminal/terminal.js";

export default class Cat extends Command {
  constructor() {
    super({
      name:        "cat",
      usage:       "cat <file>",
      description: "View a page without changing the current path",
    });
  }

  async execute({ terminal, args }) {
    if (args.length === 0) return this.usage;

    const target = args[0];

    if (["~", "/", ".."].includes(target)) {
      return `cat: ${target}: is a directory`;
    }

    const currentDir = getCurrentDir(terminal.pathStack);

    if (!currentDir || !(target in currentDir)) {
      if (currentDir && (target + "/") in currentDir) {
        return `cat: ${target}: is a directory (use 'cd' to navigate into it)`;
      }
      return `cat: ${target}: no such file. Type 'ls' to see available pages.`;
    }

    const viewUrl = "/" + [...terminal.pathStack, target].join("/");
    await terminal.navigate(viewUrl);
    return `Viewing ${target}...`;
  }
}

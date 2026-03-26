import { Command } from "./command.js";
import { getCurrentDir, isDir, dirName } from "$lib/terminal/terminal.js";

export default class Ls extends Command {
  constructor() {
    super({
      name:        "ls",
      usage:       "ls",
      description: "List files and directories at the current path",
    });
  }

  execute({ terminal }) {
    const currentDir = getCurrentDir(terminal.pathStack);
    if (!currentDir) return `ls: cannot read '${terminal.getPath()}'`;

    const lines = [`${terminal.getPath()}:`, ""];

    if (terminal.pathStack.length > 0) {
      lines.push(`  ${"../".padEnd(22)} Parent directory`);
    }

    for (const [key, item] of Object.entries(currentDir)) {
      const dir = isDir(key);
      const label = dir ? dirName(key) + "/" : key;
      lines.push(`  ${label.padEnd(22)} ${item?.description ?? ""}`);
    }

    return lines.join("\n");
  }
}

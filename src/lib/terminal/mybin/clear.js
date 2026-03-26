import { Command } from "./command.js";
import { getCurrentDir, isDir, dirName } from "$lib/terminal/terminal.js";

export default class clear extends Command {
  constructor() {
    super({
      name:        "clear",
      usage:       "clear, cls, cl",
      description: "Clears the terminal history",
    });
  }
  execute() {
    return "__CLEAR__";  
  }
}

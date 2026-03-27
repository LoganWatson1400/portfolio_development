import { Command } from "./command.js";

export default class Whoami extends Command {
  constructor() {
    super({
      name:        "whoami",
      usage:       "whoami",
      description: "Display information about Logan Watson",
    });
  }

  execute() {
    return [
      "Name:     Logan Watson",
      "Role:     Software Engineer",
      "",
      "Type 'ls' to see available pages or 'help' for commands.",
    ].join("\n");
  }
}

import { Command } from "./command.js";

export default class Pwd extends Command {
  constructor() {
    super({
      name:        "pwd",
      usage:       "pwd",
      description: "Print the current path",
    });
  }

  execute({ terminal }) {
    return terminal.getPath();
  }
}

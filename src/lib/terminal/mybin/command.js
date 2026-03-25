/**
 * Abstract base class for all terminal commands.
 *
 * Create one file per command in $lib/terminal/mybin/, e.g. cd.js, cat.js, ls.js.
 * Each file should do:
 *
 *   import { Command } from "$lib/command.js";
 *
 *   export default class Cd extends Command {
 *     constructor() {
 *       super({
 *         name:        "cd",
 *         usage:       "cd <dir>",
 *         description: "Navigate into a directory",
 *       });
 *     }
 *
 *     async execute({ terminal, args }) {
 *       // ...return a string to print
 *     }
 *   }
 */
export class Command {
  /**
   * @param {{ name: string, usage: string, description: string }} meta
   */
  constructor({ name, usage, description }) {
    if (new.target === Command) {
      throw new Error("Command is abstract — extend it, don't instantiate it directly.");
    }
    this.name        = name;
    this.usage       = usage;
    this.description = description;
  }

  /**
   * Override this in every subclass.
   *
   * @param {{
   *   terminal : Terminal,   // the live Terminal instance
   *   args     : string[],   // everything after the command name
   *   path     : string[],   // snapshot of pathStack at call time
   * }} context
   * @returns {Promise<string>}  text to print in the terminal
   */
  // eslint-disable-next-line no-unused-vars
  async execute(_context) {
    throw new Error(`${this.name}.execute() is not implemented.`);
  }
}

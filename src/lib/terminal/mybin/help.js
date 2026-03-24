import { Command } from "./command.js";

const modules = import.meta.glob("./*.js", { eager: false });

async function loadAll() {
  const cmds = [];
  for (const [path, loader] of Object.entries(modules)) {
    // Skip command.js (abstract base) and help.js itself
    const name = path.replace("./", "").replace(".js", "");
    if (name === "command" || name === "help") continue;
    const mod = await loader();
    cmds.push(new mod.default());
  }
  return cmds.sort((a, b) => a.name.localeCompare(b.name));
}

export default class Help extends Command {
  constructor() {
    super({
      name:        "help",
      usage:       "help [op]",
      description: "List all commands, or show detail for one command",
    });
  }

  async execute({ args }) {
    if (args.length > 0) {
      const target = args[0].toLowerCase();
      try {
        const mod = await import(`./${target}.js`);
        const cmd = new mod.default();
        return [
          `${cmd.name}`,
          `  ${cmd.description}`,
          `  usage: ${cmd.usage}`,
        ].join("\n");
      } catch {
        return `help: '${target}' is not a known command`;
      }
    }

    const cmds = await loadAll();
    const lines = ["Available commands:", ""];
    for (const cmd of cmds) {
      lines.push(`  ${cmd.name.padEnd(10)} ${cmd.description}`);
    }
    lines.push("", "Type 'help <op>' for usage detail.");
    return lines.join("\n");
  }
}

import commandList from "$lib/data/commands.json";
import { goto } from "$app/navigation";
import { terminalHistory } from "$lib/stores.js";

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
  const parts = command.split(" ");
  const op = parts[0];
  const mods = parts.slice(1);

  const found = commandList.find((c) => c.command === op);

  if (!found) return `command not found: ${op}`;

  switch (op) {
    case "help":
      return {
        type: "table",
        rows: commandList.map((c) => [c.command.padEnd(14), "--", c.definition]),
      };

    case "clear":
      return "__CLEAR__";

    case "projects":
      await goto("/projects");
      return "opening projects page...";

    default:
      return found.definition;
  }
}

<script>
  import { getCurrentDir, isDir, dirName } from "$lib/terminal/terminal.js";
  import { terminalValue } from "$lib/stores.js";

  export let run = async (cmd) => terminalValue.set(cmd);
  export let pathStack = [];

  $: currentDir  = getCurrentDir(pathStack) ?? {};
  $: entries     = Object.entries(currentDir);
  $: dirs        = entries.filter(([key]) => isDir(key));
  $: files       = entries.filter(([key]) => !isDir(key));

  const META_COMMANDS = ["help", "pwd", "whoami", "clear"];
</script>

<table>
  <thead>
    <tr style="font-size: clamp(0.5rem, 1vw + 8px, 3rem)">
      <td style="text-align: start;"><h1>Commands</h1></td>
      <td class="command__description" style="text-align: end;"><h1>Def</h1></td>
    </tr>
  </thead>

  <tbody>

    <!-- ── cd ──────────────────────────────────────────────────── -->
    {#if dirs.length > 0 || pathStack.length > 0}
      <tr>
        <td colspan="2">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <h3>cd</h3>
            <hr style="height: 1px; border: none; background-color: white;" />

            {#if pathStack.length > 0}
              <button class="btn-command" onclick={() => run("cd ..")}
                style="width: 100%; text-align: start; margin-left: 10%;">
                <h3>../</h3>
                <div style="color: var(--color-txt-secondary); font-size: 0.85em;">Parent directory</div>
              </button>
              <hr style="height: 1px; border: none; background-color: gray;" />
            {/if}

            {#each dirs as [key, value]}
              <button class="btn-command" onclick={() => run("cd " + dirName(key))}
                style="width: 100%; text-align: start; margin-left: 10%;">
                <div style="display: flex; flex-direction: column; width: 100%; justify-content: space-between;">
                  <h3>{dirName(key)}/</h3>
                  <div style="text-align: right; padding-left: 4px; color: var(--color-txt-secondary);">
                    {value.description ?? ""}
                  </div>
                </div>
              </button>
              <hr style="height: 1px; border: none; background-color: gray;" />
            {/each}
          </div>
        </td>
      </tr>
    {/if}

    <!-- ── cat ─────────────────────────────────────────────────── -->
    {#if files.length > 0}
      <tr>
        <td colspan="2">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <h3>cat</h3>
            <hr style="height: 1px; border: none; background-color: white;" />

            {#each files as [key, value]}
              <button class="btn-command" onclick={() => run("cat " + key)}
                style="width: 100%; text-align: start; margin-left: 10%;">
                <div style="display: flex; flex-direction: column; width: 100%; justify-content: space-between;">
                  <h3>{key}</h3>
                  <div style="text-align: right; padding-left: 4px; color: var(--color-txt-secondary);">
                    {value.description ?? ""}
                  </div>
                </div>
              </button>
              <hr style="height: 1px; border: none; background-color: gray;" />
            {/each}
          </div>
        </td>
      </tr>
    {/if}

    <!-- ── meta ────────────────────────────────────────────────── -->
    {#each META_COMMANDS as cmd}
      <tr>
        <td>
          <button class="btn-command" onclick={() => run(cmd)}
            style="width: 100%; height: 100%; text-align: start;">
            <h3>{cmd}</h3>
          </button>
        </td>
        <td class="command__description" style="width: 35%; text-align: end;">
          <button class="btn-command" onclick={() => run(cmd)}
            style="width: 100%; height: 100%; text-align: end;">
            {cmd === "help"   ? "Show available commands" : ""}
            {cmd === "pwd"    ? "Print current path"      : ""}
            {cmd === "whoami" ? "About Logan Watson"      : ""}
            {cmd === "clear"  ? "Clear the terminal"      : ""}
          </button>
        </td>
      </tr>
    {/each}

  </tbody>
</table>

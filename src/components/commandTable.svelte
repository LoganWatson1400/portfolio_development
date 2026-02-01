<script>
  import cmd from "../lib/data/commands.json";
  import { terminalValue } from "$lib/stores.js";
</script>

<table>
  <thead>
    <tr>
      <td style="text-align: start;"><h1>Command</h1></td>
      <td style="text-align: end;"><h1>Def</h1></td>
    </tr>
  </thead>

  <tbody>
    {#each cmd as line}
      <tr>
        <td>
          <button
            class="btn-command"
            onclick={() => terminalValue.set(line.command)}
            style="width: 100%; height: 100%; text-align: start;"
          >
            {line.command}
          </button>
        </td>
        <td>
          <button
            class="btn-command"
            onclick={() => terminalValue.set(line.command)}
            style="width: 100%; height: 100%; text-align: end;"
          >
            {line.definition}
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

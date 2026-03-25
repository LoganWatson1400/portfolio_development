<script>
  import { getCurrentDir, isDir, dirName } from "$lib/terminal/terminal.js";
  import { terminalValue } from "$lib/stores.js";

  export let run = async (cmd) => terminalValue.set(cmd);
  export let pathStack = [];

  $: currentDir = getCurrentDir(pathStack) ?? {};
  $: entries = Object.entries(currentDir);
  $: dirs = entries.filter(([key]) => isDir(key));
  $: files = entries.filter(([key]) => !isDir(key));

  const META_COMMANDS = ["help", "pwd", "whoami", "clear"];
  const META_DESCRIPTIONS = {
    help: "Show available commands",
    pwd: "Print current path",
    whoami: "About Logan Watson",
    clear: "Clear the terminal",
  };
</script>

<div class="panel flex col">
  <!-- header -->
  <div class="row">
    <h1>Cmds</h1>
    <h1 class="command__description">Def</h1>
  </div>
  <div class="divider white" />

  <!-- cd -->
  {#if dirs.length > 0 || pathStack.length > 0}
    <div class="row"><h3 class="label">cd</h3></div>
    <div class="divider white" />

    <div class="sublist flex col">
      <button class="row btn-command" onclick={() => run("cd /")}>
        <h3>/</h3>
      </button>
      <div class="divider gray" />
      <button class="row btn-command" onclick={() => run("cd ..")}>
        <h3>..</h3>
      </button>

      {#each dirs as [key, value], i}
        <div class="divider gray" />
        <button
          class="row btn-command"
          onclick={() => run("cd " + dirName(key))}
        >
          <h3>{dirName(key)}/</h3>
          <span class="command__description desc"
            >{value.description ?? ""}</span
          >
        </button>
      {/each}
    </div>

    <div class="divider white" />
  {/if}

  <!-- cat -->
  {#if files.length > 0}
    <div class="row"><h3 class="label">cat</h3></div>
    <div class="divider white" />

    <div class="sublist flex col">
      {#each files as [key], i}
        {#if i > 0}<div class="divider gray" />{/if}
        <button class="row btn-command" onclick={() => run("cat " + key)}>
          <h3>{key}</h3>
        </button>
      {/each}
    </div>

    <div class="divider white" />
  {/if}

  <!-- meta -->
  {#each META_COMMANDS as cmd, i}
    {#if i > 0}<div class="divider gray" />{/if}
    <button class="row btn-command" onclick={() => run(cmd)}>
      <h3>{cmd}</h3>
      <span class="command__description desc">{META_DESCRIPTIONS[cmd]}</span>
    </button>
  {/each}
</div>

<style>
  .panel {
    height: 100%;
    width: 100%;
    gap: 2px;
    overflow-y: auto;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2px 4px;
  }

  .sublist {
    padding-left: 10%;
    gap: 2px;
  }

  .label {
    color: gray;
  }

  .desc {
    color: var(--color-txt-secondary);
    font-size: 0.85em;
    text-align: right;
  }
</style>

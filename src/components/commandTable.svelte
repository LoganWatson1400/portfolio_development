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

  let panelEl;
  let scale = 2;

  // Observe the panel's width and derive a scale factor
  // Baseline: 160px → scale 1.0, clamped between 0.65 and 1.25
  $: if (panelEl) {
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      scale = Math.min(1.25, Math.max(0.65, w / 160));
    });
    ro.observe(panelEl);
  }
</script>

<div class="panel flex col" bind:this={panelEl} style="--scale: {scale}">
  <!-- header -->
  <h1 class="row">Cmds</h1>
  <div class="divider white" />
  <!-- cd -->
  {#if dirs.length > 0 || pathStack.length > 0}
    <h3 class="row label">cd</h3>
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
          <span class="command__description desc">
            {value.description ?? ""}
          </span>
        </button>
      {/each}
    </div>
    <div class="divider white" />
  {/if}
  <!-- cat -->
  {#if files.length > 0}
    <h3 class="row label">cat</h3>
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
    </button>
  {/each}
</div>

<style>
  .panel {
    height: 100%;
    width: 100%;
    margin: 0px 4px;
    gap: 2px;
    /* All font sizes below are multiplied by --scale */
    font-size: calc(0.8rem * var(--scale, 1));
    overflow-y: auto;
    overflow-x: hidden;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: inherit;
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
    font-size: calc(0.85em * var(--scale, 1));
    text-align: right;
  }
</style>

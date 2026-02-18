<script>
  import favicon from "$lib/assets/favicon.svg";
  import { tick, onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import CommandTable from "../components/commandTable.svelte";
  import { terminalValue, terminalHistory } from "$lib/stores.js";

  import { runCmd } from "$lib/terminal/terminal";

  
  let {children} = $props();
  let historyEl;
  let inputEl; 

  afterNavigate(() => {
    setTimeout(() => {
      inputEl?.focus();
    }, 50);
  });

  $effect(() => {
    $terminalHistory;
    scrollToBottom();
  });

  function handleKey(e) {
    if (e.key === "Enter") {
      runCmd($terminalValue);
      terminalValue.set("");
    }
  }

  async function scrollToBottom() {
    await tick();
    historyEl?.scrollTo({ top: historyEl.scrollHeight, behavior: "smooth" });
  }

  function isTable(line) {
    return line && line.type === "table";
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- root: full viewport, flex column -->
<div
  class="box"
  style="
  height: 95%;
  margin: 2vmin;
  display: flex;
  flex-direction: column;
"
>
  <!--- header --->
  <div
    class="box"
    style="
    flex-shrink: 0;
    padding: 16px;
    padding-bottom: 8px;
  "
  >
    <div style="display: flex; justify-content: space-between;">
      <h1 style="font-size: clamp(0.5rem, 2vw + 8px, 3rem)">Logan Watson:</h1>
      <h1>Root</h1>
    </div>
    <hr style="height: 1px; background-color: white;" />
  </div>

  <!--- body container --->
  <div
    class="box"
    style="
    min-height: 0%;
    border-top: 0;
    flex: 1;
    display: flex;
    padding: 0;
  "
  >
    <!--- left: pages + terminal --->
    <div
      class="box"
      style="
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding: 0;
    "
    >
      <!--- pages --->
      <div
        style="
        flex: 1;
        min-height: 0;
        overflow: hidden;
        position: relative;
      "
      >
        <!--- scrollable content --->
        <div style="height: 100%; overflow-y: auto; padding: 32px 8px;">
          {@render children()}
        </div>

        <!--- glass history overlay, anchored to bottom --->
        {#if $terminalHistory.length > 0}
          <div
            class="terminal"
            bind:this={historyEl}
            style="
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              max-height: 50%;
              overflow: scroll;
              scrollbar-width: none;
              padding: 8px;
              background-color: rgba(26, 24, 27, 0.55);
              backdrop-filter: blur(2px);
              border-top: 1px solid rgba(255, 255, 255, 0.15);
            "
          >
            {#each $terminalHistory as line}
              {#if isTable(line)}
                <div style="display: flex; flex-direction: column; gap: 0 16px; padding: 2px 0;">
                  {#each line.rows as row}
                    <div style="display: flex; flex-wrap: nowrap;">
                    <div style="margin-left: 5%;"></div>
                      {#each row as col, i}

                        <span
                          class="terminal"
                          style="
                          {(i % 3) === 0? 'flex: 2 3 5%' : ''}
                          {(i % 3) === 1? 'flex: 1 6 5%' : ''}
                          {(i % 3) === 2? 'flex: 9 1 5%' : ''}
                          ">{col}</span
                        >
                      {/each}
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="terminal">{line}</div>
              {/if}
            {/each}
          </div>
        {/if}
      </div>

      <!--- terminal --->
      <div
        class="terminal input"
        style="display: flex; background-color: #333;"
      >
        <input
          bind:this={inputEl}
          type="text"
          autofocus
          style="
            padding: 2px;
            flex: 1; 
            background: none; 
            border: none; 
            color: var(--color-txt-primary);
            outline: none;
            font-size: clamp(0.5rem, 1vw + 8px, 3rem)
            "
          value={$terminalValue}
          oninput={(e) => terminalValue.set(e.target.value)}
          onkeydown={handleKey}
        />
      </div>
    </div>

    <!--- commands --->
    <div
      class="box"
      style="
      width: 30%;
      border-left: 0;
      overflow-y: auto;
    "
    >
      <CommandTable run={async (cmd) => { terminalValue.set(cmd); await runCmd(cmd); terminalValue.set(''); inputEl?.focus(); }} />
    </div>
  </div>
</div>

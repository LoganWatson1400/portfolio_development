<script>
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";
  import { tick, onMount } from "svelte";
  import { slide, fade } from "svelte/transition";
  import { afterNavigate } from "$app/navigation";
  import CommandTable from "../components/commandTable.svelte";
  import { terminalValue, terminalHistory } from "$lib/stores.js";
  import { Terminal } from "$lib/terminal/terminal.js";

  let { children } = $props();
  let historyEl;
  let inputEl;

  let terminal;
  let currentPath = $state("/");

  // ── terminal history visibility state ──────────────────────────────────────
  let pinned = $state(false); // user toggled "keep open"
  let isHovered = $state(false); // mouse is inside the history panel or terminal input
  let showHistory = $state(false); // master visibility flag
  let hideTimeout;

  function startHideTimer() {
    clearTimeout(hideTimeout);
    if (!pinned && !isHovered) {
      hideTimeout = setTimeout(() => {
        showHistory = false;
      }, 5000);
    }
  }

  function cancelHideTimer() {
    clearTimeout(hideTimeout);
  }

  function onHistoryMouseEnter() {
    isHovered = true;
    cancelHideTimer(); // keep visible while hovering
  }

  function onHistoryMouseLeave() {
    isHovered = false;
    startHideTimer(); // begin countdown once mouse leaves
  }

  function togglePin() {
    pinned = !pinned;
    if (pinned) {
      // pinned → cancel any pending hide
      cancelHideTimer();
      showHistory = $terminalHistory.length > 0;
    } else {
      // un-pinned → start the hide countdown
      startHideTimer();
    }
  }
  // ──────────────────────────────────────────────────────────────────────────

  onMount(() => {
    terminal = new Terminal();
    currentPath = terminal.getPath();
    inputEl?.focus();
  });

  afterNavigate(() => {
    setTimeout(() => inputEl?.focus(), 50);
  });

  // Whenever history changes: show the panel, reset the countdown
  $effect(() => {
    $terminalHistory;
    if ($terminalHistory.length > 0) {
      showHistory = true;
      startHideTimer();
    } else {
      showHistory = false;
      cancelHideTimer();
    }
    scrollToBottom();
  });

  async function runCmd(input) {
    if (!terminal) return;
    await terminal.run(input);
    currentPath = terminal.getPath();
  }

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

<!-- root -->
<div
  class="box flex col"
  style="    
    height: 95%;
    margin: 2vmin;
    gap: 0;
  "
>
  <!-- header -->
  <div class="box" style="flex-shrink: 1; padding: 1%;">
    <div
      class="flex"
      style="
        justify-content: space-between;
        font-size: 1vw;
      "
    >
      <h1>Logan Watson:</h1>
      <h1>{currentPath}</h1>
    </div>
    <div class="divider"></div>
  </div>

  <!-- body -->
  <div
    class="box flex"
    style="min-height: 0; flex: 1; border-top: 0; padding: 0; gap: 0;"
  >
    <!-- left: page + terminal -->
    <div
      class="box flex col"
      style="flex: 10 1 0; min-width: 0; justify-content: end; padding: 0;"
    >
      <!-- page -->
      <div
        style="flex: 1; min-height: 0; overflow: hidden; position: relative;"
      >
        <div
          style="
            height: 100%; 
            overflow-y: auto; 
            padding: 32px 8px;
          "
        >
          {@render children()}
        </div>

        <!--── terminal history panel ───────────────────────────────────────-->
        {#if $terminalHistory.length > 0 && showHistory}
          <div
            class="terminal"
            role="log"
            aria-label="Terminal History"
            bind:this={historyEl}
            transition:slide={{ duration: 280, axis: "y" }}
            onmouseenter={onHistoryMouseEnter}
            onmouseleave={onHistoryMouseLeave}
            style="
              position: absolute;
              bottom: 0; left: 0; right: 0;
              max-height: 50%;
              overflow: auto;
              scrollbar-width: 2vw;
              padding: 8px;
              background-color: rgba(26,24,27,0.55);
              backdrop-filter: blur(2px);
              border-top: 1px solid rgba(255,255,255,0.15);
            "
          >
            <!-- pin toggle — replaces the old "clear history" button -->
            <button
              onclick={togglePin}
              class="btn flex"
              style="
                position: sticky;
                top: 0;
                float: right;
                z-index: 10;
                cursor: pointer;
                font-size: 1vw;
                gap: 4px;
                border-color: {pinned
                ? 'var(--color-txt-highlight, #aaa)'
                : 'rgba(255,255,255,0.3)'};
              "
            >
              <!-- simple pin icon -->
              <img
                src="/img/pin.svg"
                alt="Pin"
                style="width:10px; height:10px; filter: invert(1);"
              />
              {pinned ? "pinned" : "pin"}
            </button>

            {#each $terminalHistory as line}
              {#if isTable(line)}
                <div class="flex col" style="gap: 0; padding: 2px 0;">
                  {#each line.rows as row}
                    <div class="flex" style="flex-wrap: nowrap;">
                      <div style="margin-left: 5%;"></div>
                      {#each row as col, i}
                        <span
                          class="terminal"
                          style="{i % 3 === 0 ? 'flex:2 3 5%' : ''}{i % 3 === 1
                            ? 'flex:1 6 5%'
                            : ''}{i % 3 === 2 ? 'flex:9 1 5%' : ''}">{col}</span
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

      <!-- terminal input -->
      <div
        class="terminal input flex"
        role="region"
        aria-label="Terminal"
        style="
          background-color: #333;
        "
        onmouseenter={onHistoryMouseEnter}
        onmouseleave={onHistoryMouseLeave}
      >
        <input
          bind:this={inputEl}
          type="text"
          style="
            padding: 2px; 
            flex: 1; 
            background: none; 
            border: none; 
            color: var(--color-txt-primary); 
            outline: none; 
            font-size: clamp(0.5rem, 1vw + 8px, 3rem);
            "
          value={$terminalValue}
          oninput={(e) => terminalValue.set(e.target.value)}
          onkeydown={handleKey}
        />
      </div>
    </div>

    <!-- command table -->
    <div
      class="box"
      style="
        flex: 2 20 0; 
        min-width: fit-content; 
        padding: 1%;
        border-left: 0; 
        overflow: hidden;
      "
    >
      <CommandTable
        run={async (cmd) => {
          terminalValue.set(cmd);
          await runCmd(cmd);
          terminalValue.set("");
          inputEl?.focus();
        }}
      />
    </div>
  </div>
</div>

<script>
  import ascii from "$lib/data/ascii.json";
  import { onMount } from "svelte";

  let chars = [];
  let maxCol = 0;

  const charWidth = 8;
  const charHeight = 16;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- shuffle ---------- */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------- merge ---------- */
  function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
      if (left[0].index < right[0].index) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return [...result, ...left, ...right];
  }

  /* ---------- recursive merge sort with live update ---------- */
  async function mergeSort(arr, start = 0) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid), start);
    const right = await mergeSort(arr.slice(mid), start + mid);

    const merged = merge(left, right);

    // Update chars for this section
    for (let i = 0; i < merged.length; i++) {
      chars[start + i] = merged[i];
    }
    chars = [...chars]; // trigger reactive update

    await sleep(0); // pause so we can see the section update

    return merged;
  }

  /* ---------- run ---------- */
  async function run() {
    maxCol = Math.max(...ascii.map((a) => a.col)) + 1;

    // initial shuffle
    chars = shuffle([...ascii]);
    chars = [...chars]; // trigger DOM

    await sleep(500);

    // sort & update section by section
    await mergeSort(chars, 0);
  }

  onMount(run);
</script>

<div class="stage">
  {#each chars as c, i}
    <span
      class="pixel"
      style="
        left:{(i % maxCol) * charWidth}px;
        top:{Math.floor(i / maxCol) * charHeight}px;
        color:{c.color};
      "
    >
      {(c.char === '.' || c.char === '/') ? '\u00A0' : c.char}
    </span>
  {/each}
</div>

<style>
  .stage {
    font-family: "Courier New", Courier, monospace;
    line-height: 1;
    font-size: 16px;
  }
  .pixel {
    position: absolute;
    white-space: pre;
    letter-spacing: 0.4ch;
  }
</style>

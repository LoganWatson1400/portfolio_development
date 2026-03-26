<script>
  import ascii from "$lib/data/ascii.json";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let chars = [];
  let maxCol = 0;

  // Manual scaling factor for character width (in vw)
  let scale = 0.4; 

  let lineHeightFactor = 1.5; // e.g., 2 means each line is twice the scale

  const minSleep = 1;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  async function merge(arr, start, mid, end) {
    const merged = [];
    let i = start, j = mid;
    while (i < mid && j < end) {
      if (arr[i].index < arr[j].index) merged.push(arr[i++]);
      else merged.push(arr[j++]);
    }
    while (i < mid) merged.push(arr[i++]);
    while (j < end) merged.push(arr[j++]);
    for (let k = 0; k < merged.length; k++) arr[start + k] = merged[k];

    if (end - start >= 6) {
      chars = [...arr];
      await sleep(minSleep);
    }
  }

  async function mergeSort(arr, start = 0, end = arr.length) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid, end);

    await merge(arr, start, mid, end);
  }

  async function run() {
    maxCol = Math.max(...ascii.map((a) => a.col)) + 1;
    chars = shuffle([...ascii]);
    chars = [...chars];
    await sleep(minSleep);

    const n = chars.length;
    const quarter = Math.floor(n / 4);

    await Promise.all([
      mergeSort(chars, 0, quarter),
      mergeSort(chars, quarter, 2 * quarter),
      mergeSort(chars, 2 * quarter, 3 * quarter),
      mergeSort(chars, 3 * quarter, n),
    ]);

    await sleep(300);
    await Promise.all([
      merge(chars, 0, quarter, 2 * quarter),
      merge(chars, 2 * quarter, 3 * quarter, n),
    ]);

    await sleep(300);
    await merge(chars, 0, 2 * quarter, n);

    const beginEl = document.getElementById("begin");
    if (beginEl) beginEl.textContent = "Welcome To My Portfolio";

    await sleep(5000);
    goto("/welcome");
  }

  onMount(run);
</script>

<div
  class="flex col"
  style="justify-content: center; align-items: center; width: 100%; height: 100%;"
>
  <div
    class="stage"
    style="
      --scale: {scale}vw;
      --line-height: {lineHeightFactor};
      position: relative;
      width: calc(var(--scale) * {maxCol});
      height: calc(var(--scale) * var(--line-height) * {Math.ceil(chars.length / maxCol)});
    "
  >
    {#each chars as c, i}
      <span
        class="pixel"
        style="
          left: calc(var(--scale) * {(i % maxCol)});
          top: calc(var(--scale) * var(--line-height) * {Math.floor(i / maxCol)});
          color: {c.color};
          font-size: calc(var(--scale) * var(--line-height));
        "
      >
        {c.char === "." || c.char === "/" ? "\u00A0" : c.char}
      </span>
    {/each}
  </div>

  <div
    id="begin"
    style="margin-top: 20px; font-size: 24px; color: #fff; text-align: center;"
  ></div>
</div>

<style>
  .stage {
    font-family: "Courier New", Courier, monospace;
    line-height: 1;
  }
  .pixel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre;
    letter-spacing: 0.1ch;
  }
</style>

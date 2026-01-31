<script>
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
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
      <h1>Logan Watson:</h1>
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
      padding: 0;
    "
    >
      <!--- pages --->
      <div
        style="
        flex: 1;
        overflow-y: auto;
        padding: 32px 8px;
      "
      >
        {@render children()}
      </div>

      <!--- terminal --->
      <div class="terminal" style="display: flex; background-color: #333;">
        <input
          type="text"
          style="
            flex: 1; 
            background: none; 
            border: none; 
            color: var(--color-txt-primary);"
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
      <table>
        <thead>
          <tr>
            <td>Command</td>
            <td>Def</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>test.test --help</td>
            <td>test.test --help</td>
          </tr>
          <tr>
            <td>test.test --help</td>
            <td></td>
          </tr>
          <tr>
            <td>test.test --help</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

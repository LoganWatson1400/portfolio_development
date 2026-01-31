<script>
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="box" style="margin: 32px; height: 100%; max-height: 100vh;">
  <!--- header --->
  <div class="box" style="padding: 16px; padding-bottom: 8px;">
    <div style="display: flex; justify-content: space-between;">
      <h1>Logan Watson:</h1>
      <h1>Root</h1>
    </div>
    <hr style="height: 1px; background-color: white;" />
  </div>

  <div class="box" style="border-top: 0;">
    <div class="box" style="display: flex;">
      <div class="box" style=" width: 70%; padding: 0;">
        <!--- pages --->
        <div style="padding: 32px 8px; height: 100%;">
          {@render children()}
        </div>
        <!--- pages --->
        <div
          class="termimal"
          style="
            width: 100% - before; 
            background-color: #333;
            padding: 4px;
            border: none;"
        >
          <input
            type="input"
            style="
              width: 100%;
              background-color: #333;
              border: none;
              overflow-x: auto;"
          />
        </div>
      </div>

      <!--- commands --->
      <div
        style="width: 30%; overflow-y: auto;"
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
            </tr>
            <tr>
              <td>test.test --help</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

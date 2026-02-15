<script>
  import { terminalValue } from "$lib/stores.js";
  import { runCmd } from "$lib/terminal/terminal";

  let { data } = $props();
  let project = data.project;

  async function run(cmd) {
    terminalValue.set(cmd);
    await runCmd(cmd);
    terminalValue.set('');
  }
</script>

<div>
  <button onclick={() => run("cd projects")}>← Back</button>

  <h1>{project.title}</h1>

  {#if project.image}
    <img src={project.image} alt={project.image_alt} />
  {/if}

  <p>{project.description}</p>

  <div>
    {#each project.tags as tag}
      <span>{tag}</span>
    {/each}
  </div>

  {#if project.link !== "#"}
    <a href={project.link} target="_blank">View Project</a>
  {/if}
</div>

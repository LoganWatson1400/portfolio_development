<script>
  export let project = {
    title: "Default Project",
    route: "",
    description: "No Project Description",
    image: "",
    image_alt: "Project Image",
    tags: [],
    link: "#",
  };

  import { terminalValue } from "$lib/stores.js";
  import { runCmd } from "$lib/terminal/terminal";
  export let run = async (cmd) => { terminalValue.set(cmd); await runCmd(cmd); terminalValue.set(''); };
</script>

<div
  class="card secondary"
  style="
    display: flex; 
    flex: 1;
    flex-direction: column; 
    min-width: 250px;
    width: 30%; 
    height: 512px;
    padding: 16px;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    "
>
  <div style="display: flex;">
    <h1 style="height: 20%; text-align: center; margin: 8px 0px;">
      {project.title}
    </h1>
    {#if project.route != ""}
      <button
        class="button-secondary"
        onclick={() => run("cd " + project.route)}
      >
        <img src="/img/menue.svg" alt="{project.title} Details Button" />
      </button>
      
    {/if}
  </div>

  <hr class="divider white" />
  <div style="width: 100%; height: 50%; margin: 0px 2px">
    {#if project.image == ""}
      <h3
        style="
        width: 100%; 
        height: 100%; 
        color: var(--color-txt-secondary); 
        padding: 20px;
        text-align: center;
        "
      >
        No Image Available
      </h3>
    {:else}
      <img
        src={project.image}
        alt={project.image_alt}
        style="width: 100%; padding: auto; overflow: hidden;"
      />
    {/if}
  </div>
  <hr class="divider white" />
  <h5
    style="
    width: 100%;
    height: 30%; 
    font-weight: normal;
    padding: 4px;
    background-color: rgba(100, 100, 100, 0.2);
    overflow-y: scroll;
    "
  >
    {project.description}
  </h5>
</div>

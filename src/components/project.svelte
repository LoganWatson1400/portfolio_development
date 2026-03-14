<script>
  import { goto } from "$app/navigation";
  import { terminalValue } from "$lib/stores.js";
  import { runCmd } from "$lib/terminal/terminal";

  export let project = {
    title: "Default Project",
    route: "",
    description: "No Project Description",
    image: "",
    image_alt: "Project Image",
    tags: [],
    link: "#",
  };

  export let run = async (cmd) => {
    terminalValue.set(cmd);
    await runCmd(cmd);
    terminalValue.set("");
  };

  // Function to navigate to project detail page
  const navigateToProject = () => {
    // Extract slug from route (removes 'projects/' prefix if present)
    const slug = project.route.replace(/^projects\//, "");
    goto(`/projects/${slug}`);
  };
</script>

<div class="card secondary"
  style="
    display: flex; 
    flex: 1;
    flex-direction: column; 
    min-width: 250px;
    height: 512px;
    padding: 16px;
    justify-content: start;
    align-items: center;
  ">
  <div id="Title Container"
    style="
      display: flex; 
      width: 100%;
      justify-content: space-between;
    ">
    <div id="Title"
      style="
        display: flex;
        height: fit-content;
        flex: 1 0 auto;
        max-width: 100%;
        padding: 4px;
        gap: 4px;
      ">
      <h1
        style="
          height: 20%; 
          width: 80%; 
          text-align: center; 
          margin: 8px 0px; 
          flex: 1 3 auto
        ">
        {project.title}
      </h1>
      {#if project.route != ""}
        <button class="btn-light"
          style="
            border-radius: 64px;
            height: fit-content; 
            width: fit-content; 
            padding: 16px; 
            align-self: center;
          "
          onclick={navigateToProject}
        >
          <img
            src="/img/menu.svg"
            style="flex: 1 1 auto"
            alt="{project.title} Details Button"
          />
        </button>
      {/if}
  </div>
  </div>
  <hr class="divider white" />
  <div id="Project Img"
    style="
      flex: 1 0 auto;
      width: 100%; 
      max-height: 50%;
      margin: 0px 2px;
      overflow: hidden;
    ">
    {#if project.image == ""}
      <h3
        style="
        color: var(--color-txt-secondary); 
        padding: 20px;
        text-align: center;
      ">
        No Image Available
      </h3>
    {:else}
      <img
        src={project.image}
        alt={project.image_alt}
        style="width: 100%; padding: auto;">
    {/if}
  </div>
  <hr class="divider white" />
  <h5
    style="
      flex: 1 1 100%;
      font-weight: normal;
      padding: 4px;
      background-color: rgba(100, 100, 100, 0.2);
      overflow-y: scroll;
    ">
    {project.description}
  </h5>
</div>

<script>
  import { terminalValue } from "$lib/stores.js";
  import { runCmd, gotoWithoutSync } from "$lib/terminal/terminal";

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

  $: slug = project.route.replace(/^projects\//, "");
  $: href = project.route !== "" ? `/projects/${slug}` : null;
</script>

<!-- app.css: "flex col" covers display:flex + flex-direction:column -->
<div class="card secondary project-card flex col" class:interactive={href !== null}>

  <div class="flex" style="width: 100%; justify-content: space-between;">
    <div class="flex project-title-row">
      <h1 class="project-title">{project.title}</h1>

      {#if href !== null}
        <a
          class="stretched-link"
          {href}
          aria-label="View {project.title} project"
          on:click|preventDefault={() => gotoWithoutSync(href)}
        ></a>
      {/if}
    </div>
  </div>

  <hr class="divider white" />

  <div class="project-img">
    {#if project.image === ""}
      <h3 style="color: var(--color-txt-secondary); padding: 20px; text-align: center;">No Image Available</h3>
    {:else}
      <img src={project.image} alt={project.image_alt} style="width: 100%;" />
    {/if}
  </div>

  <hr class="divider white" />

  <div class="project-description-wrap">
    <h5 class="project-description">{project.description}</h5>
    <div class="description-fade"></div>
  </div>
</div>

<style>
  /* ─── Card shell ─────────────────────────────────────────── */
  .project-card {
    flex: 1;
    min-width: 250px;
    height: 512px;
    padding: 16px;
    justify-content: start;
    align-items: center;
    position: relative;
  }

  /* ─── Title area ─────────────────────────────────────────── */
  .project-title-row {
    height: fit-content;
    flex: 1 0 auto;
    max-width: 100%;
    padding: 4px;
    gap: 4px;
    align-items: center;
  }

  .project-title {
    width: 80%;
    text-align: center;
    margin: 8px 0;
    flex: 1 3 auto;
  }

  /* ─── Image area ─────────────────────────────────────────── */
  .project-img {
    flex: 1 0 auto;
    width: 100%;
    max-height: 50%;
    margin: 0 2px;
    overflow: hidden;
  }

  /* ─── Description ────────────────────────────────────────── */
  .project-description-wrap {
    flex: 1 1 100%;
    position: relative;
    overflow: hidden;
    min-height: 0;
  }

  .project-description {
    height: 100%;
    font-weight: normal;
    padding: 4px;
    background-color: rgba(100, 100, 100, 0.2);
    overflow: hidden;
  }

  .description-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background: linear-gradient(to bottom, transparent, var(--color-secondary, #2a2a2a));
    pointer-events: none;
  }

  /* ─── Stretched link ─────────────────────────────────────── */
  .stretched-link::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
  }

  /* ─── Interactive card states ────────────────────────────── */
  .card.interactive {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }

  .card.interactive:has(.stretched-link:hover) {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .card.interactive:has(.stretched-link:focus-visible) {
    outline: 2px solid var(--color-txt-primary);
    outline-offset: 2px;
  }

  /* Keep any future interactive children above the stretched overlay */
  .project-card :global(button),
  .project-card :global(a:not(.stretched-link)) {
    position: relative;
    z-index: 2;
  }
</style>
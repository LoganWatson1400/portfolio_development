<script>
  let { project = {} } = $props();
</script>

<section id="project">
  <div class="flex col project-container">
    <div class="flex header" style="align-items:center;">
      <h1 class="project-title" style="flex:1; margin:0;">
        {project?.title ?? "Untitled Project"}
      </h1>

      {#if project?.link}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
        >
          <img src="/img/github.svg" alt="GitHub" />
        </a>
      {/if}

      <button
        class="btn"
        style="max-width: 64px;"
        onclick={() => history.back()}
      >
        back
      </button>
    </div>
    <hr class="divider white" />

    <div class="project-content">
      {#if !project?.image}
        <h3 class="no-image">No Image Available</h3>
      {:else}
        <img
          class="project-image"
          src={project.image}
          alt={project.image_alt ?? ""}
        />
      {/if}

      <p class="card secondary project-description">
        {project?.description ?? ""}
      </p>
    </div>
  </div>
</section>

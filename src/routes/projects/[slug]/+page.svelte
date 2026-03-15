<script>
  export let data;
</script>

<div class="flex col project-container">
  <div class="flex header" style="align-items:center;">
    <h1 class="project-title" style="flex:1; margin:0;">
      {data.project.title}
    </h1>
    {#if data.project.link}
      <a
        href={data.project.link}
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        <img src="/img/github.svg" alt="GitHub" />
      </a>
    {/if}
    <button class="btn" style="max-width: 64px;">
      <a href="/projects">back</a>
    </button>
  </div>

  <hr class="divider white" />

  <div class="project-content">
    {#if data.project.image === ""}
      <h3 class="no-image">No Image Available</h3>
    {:else}
      <img
        class="project-image"
        src={data.project.image}
        alt={data.project.image_alt}
      />
    {/if}

    <!-- <hr class="divider white content-divider" /> -->

    <p class="card secondary project-description">
      {data.project.description}
    </p>
  </div>
</div>

<style>
  .project-content {
    container-type: inline-size;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: start;
    justify-items: center;
  }

  .project-image {
    flex: 1 1 auto;
    min-width: 50%;
  }

  .project-description {
    flex: 2 1 300px;
    min-width: 0;
    border: 2px solid white;
    padding: 16px;
    font-size: 32px;
  }
</style>

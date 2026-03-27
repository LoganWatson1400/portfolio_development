<script>
  import Project from "$lib/components/Project.svelte";

  let { projects = [] } = $props();
</script>

<section id="ProjectGrid">
  <div
    style="
      display: inline-flex;
      flex-wrap: wrap;
      row-gap: 32px;
      column-gap: 16px;
      justify-content: space-evenly;
      margin: 32px;
    "
  >
    {#if projects.length}
      {#each projects as project}
        {#if project}
          <Project {project} />
        {/if}
      {/each}
    {/if}
  </div>
</section>

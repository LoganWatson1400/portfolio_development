<script>
  import ProjectGrid from '$lib/sections/ProjectGrid.svelte';

  export let data;
</script>

<ProjectGrid projects={data.projects} />

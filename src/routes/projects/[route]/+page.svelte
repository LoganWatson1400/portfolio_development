<script>
  import Project from '../../../components/project.svelte';
  export let data;
  const { project } = data;
</script>

<style>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 4rem);
    padding: 2rem;
  }
</style>

<div class="center">
  <Project {project} />
</div>

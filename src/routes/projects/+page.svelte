<script>
  import Project from "../../components/project.svelte";

  let { data } = $props();
</script>

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
  {#each data.projects as project}
    <Project {project} />
  {/each}
</div>

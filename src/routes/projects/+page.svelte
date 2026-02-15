<script>
  import Project from "../../components/project.svelte";
  import projectData from "$lib/data/projects.json";
  import { terminalValue } from "$lib/stores.js";
  export let run = async (cmd) => terminalValue.set(cmd);
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
  {#each projectData as project}
    <Project {project} />
  {/each}
</div>

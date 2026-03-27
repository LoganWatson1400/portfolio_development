<script>
  import Welcome from "$lib/sections/Welcome.svelte";
  import About from "$lib/sections/About.svelte";
  import Contact from "$lib/sections/Contact.svelte";
  import Skills from "$lib/sections/Skills.svelte";
  import Experience from "$lib/sections/Experience.svelte";
  import ProjectGrid from "$lib/sections/ProjectGrid.svelte";

  let { data } = $props();
</script>

<main
  style="
    width: 90%; 
    justify-self: center;
    justify-items: center;
  "
>
  <section id="welcome"><Welcome /></section>
  <section id="about"><About /></section>
  <section id="contact"><Contact /></section>
  <section id="skills"><Skills skills={data?.skills ?? []} /></section>
  <section id="experience"><Experience /></section>
  <section id="projectgrid" style="padding: 0px 10%;">
    <ProjectGrid projects={data?.projects ?? []} />
  </section>
</main>

<style>
  section {
    min-height: 100vh;
    min-width: 100vw;
    width: 100%;
  }
</style>

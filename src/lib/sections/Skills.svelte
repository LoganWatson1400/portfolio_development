<script>
  import Skill from "$lib/components/Skill.svelte";

  export let skills = [];
</script>

<section id="Skills" style="width: 80%; justify-self: center; justify-items: center;">
  <div class="flex col" style="width: 100%;  max-width: 1000px;">
    <div
      class="flex"
      style="align-items: center; justify-content: space-between; margin-bottom: 8px;"
    >
      <div>
        <h1>Skills</h1>
        <p
          style="color: var(--color-txt-secondary); font-size: 0.85rem; margin-top: 4px;"
        >
          Dynamically updated via Roadmap.sh
        </p>
      </div>

      <a
        href="https://roadmap.sh/u/loganwatson"
        class="btn"
        target="_blank"
        rel="noopener noreferrer"
        style="width: fit-content; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem;"
      >
        My Roadmap ↗
      </a>
    </div>

    {#if skills.length}
      {#each skills as { skill, percent }}
        <Skill {skill} {percent} />
      {/each}
    {/if}

  </div>
</section>

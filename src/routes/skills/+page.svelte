<script>
    import Skill from "../../components/skill.svelte";
    export let data;
</script>

<div class="flex col" style="max-width: 600px; margin: 2rem auto; gap: 12px;">
    <div class="flex" style="align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <div>
            <h1>Skills</h1>
            <p style="color: var(--color-txt-secondary); font-size: 0.85rem; margin-top: 4px;">
                Dynamically updated via Roadmap.sh
            </p>
        </div>
        <a href="https://roadmap.sh/u/loganwatson"
            class="btn"
            target="_blank"
            rel="noopener noreferrer"
            style="width: fit-content; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem;">
            My Roadmap ↗
        </a>
    </div>
    {#each data.skills as { skill, percent }}
        <Skill {skill} {percent} />
    {/each}
</div>
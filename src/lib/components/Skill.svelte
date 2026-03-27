<script>
    export let skill;
    export let percent;

    $: pct = percent <= 1 ? Math.round(percent * 100) : percent;
</script>

<div class="card secondary skill">
    <div class="flex" style="justify-content: space-between;">
        <span>{skill}</span>
        <span>{pct}%</span>
    </div>
    <div class="bar">
        <div class="fill" style="width: {pct}%"></div>
    </div>
</div>

<style>
    .skill {
        padding: 10px 14px;
        width: 100%;
    }

    .bar {
        margin-top: 8px;
        background: var(--midnight-violet-2);
        border-radius: 999px;
        height: 8px;
        overflow: hidden;
    }

    .fill {
        height: 100%;
        background: var(--hot-rose);
        border-radius: 999px;
        transition: width 0.4s ease;
    }
</style>

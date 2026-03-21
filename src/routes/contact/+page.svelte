<script>
  const links = [
    { label: 'Email',    value: 'logan.ad.watson@outlook.com', href: 'mailto:logan.ad.watson@outlook.com' },
    { label: 'Phone',    value: '(920) 379-5628',              href: 'tel:+19203795628' },
    { label: 'GitHub',   value: 'LoganWatson1400',             href: 'https://github.com/LoganWatson1400' },
    { label: 'Location', value: 'Winneconne, WI',              href: null },
  ];
</script>

<div class="page flex col">
  <div>
    <h1>Contact</h1>
    <p style="color: var(--color-txt-secondary); margin-top: 4px;">Feel free to reach out.</p>
  </div>

  <div class="flex col" style="gap: 10px;">
    {#each links as { label, value, href }}
      <div class="card secondary row">
        <span class="label">{label}</span>
        {#if href}
          <a {href} target={href.startsWith('http') ? '_blank' : null}
            rel="noopener noreferrer"
            style="color: var(--color-txt-highlight);">{value} ↗</a>
        {:else}
          <span style="color: var(--color-txt-secondary);">{value}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .page {
    max-width: 480px;
    margin: 2rem auto;
    gap: 1.5rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    width: 100%;
  }

  .label {
    min-width: 80px;
    font-size: 0.85rem;
    color: var(--color-txt-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
</style>

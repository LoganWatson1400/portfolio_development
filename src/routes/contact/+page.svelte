<div class="contact-root flex col">
  <p class="terminal" style="color: var(--color-txt-secondary)">~ $ whoami</p>

  <h1 class="identity-name">Logan<br />Watson</h1>

  <hr class="divider white" />

  <div class="flex col" style="gap: 0.85rem">
    <p class="terminal" style="color: var(--color-txt-secondary)">
      Full Stack Developer
    </p>
    <a
      href="mailto:logan.ad.watson+portfolio@outlook.com"
      class="terminal link-row">✉ logan.ad.watson@outlook.com</a
    >
    <a
      href="https://github.com/LoganWatson1400"
      target="_blank"
      rel="noopener"
      class="terminal link-row">⌥ github/LoganWatson</a
    >
    <a
      href="https://linkedin.com/in/logan-ad-watson"
      target="_blank"
      rel="noopener"
      class="terminal link-row">◈ linkedin/logan-ad-watson</a
    >
  </div>

  <hr class="divider white" />

  <p class="terminal availability">
    <span class="status-dot"></span>
    Available for opportunities
  </p>
</div>

<style>
  .contact-root {
    height: fit-content;
    width: fit-content;
    align-items: center;
    justify-self: center;
    justify-content: center;
    padding: clamp(1.5rem, 4vw, 4rem);
  }

  .identity-name {
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .link-row {
    color: var(--color-txt-secondary);
    transition: color 0.15s;
  }
  .link-row:hover {
    color: var(--color-txt-primary);
  }

  .availability {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--color-txt-secondary);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-txt-success);
    box-shadow: 0 0 6px var(--color-txt-success);
    flex-shrink: 0;
    animation: pulse 2.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>

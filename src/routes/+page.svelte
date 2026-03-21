<div class="page-root flex col">
  <div class="card secondary hint-card">
    <p style="font-size: clamp(1rem, 2vw, 1.4rem); line-height: 1.7;">
      <b>Welcome to my portfolio.</b> <br />
      Type
      <strong style="color: var(--color-txt-highlight);">ls</strong>
      to list pages,
      <strong style="color: var(--color-txt-highlight);"
        >cat &lt;file&gt;</strong
      >
      to read one, or
      <strong style="color: var(--color-txt-highlight);">cd &lt;dir&gt;</strong>
      to navigate. <br /> You can also click from the panel on the right.
    </p>
  </div>

  <div class="card secondary flex main-card">
    <div
      class="flex col"
      style="
        flex: 1; 
        gap: 12px; 
        min-width: 0; 
      "
    >
      <h1 class="identity-name">Logan<br />Watson</h1>
      <p
        class="terminal"
        style="
          color: var(--color-txt-secondary); 
          letter-spacing: 0.1em; 
          font-size: 0.75rem;
        "
      >
       FULL STACK DEVELOPER 
      </p>
      <hr class="divider white" style="width: 48px;" />
      <p
        style="
          color: var(--color-txt-secondary); 
          line-height: 1.6; 
          font-size: 0.9rem;
        "
      >
        CS student at UW-Milwaukee. I build across the stack: web apps, ML
        tools, and games.
      </p>
      <div class="flex" style="gap: 12px; flex-wrap: wrap;">
        <a href="/about"><button class="btn">About</button></a>
        <a href="/projects"><button class="btn">Projects</button></a>
        <a href="/contact"><button class="btn">Contact</button></a>
      </div>
    </div>

    <div class="card image-card">
      <img
        src="/img/dragon.jpg"
        alt=""
        style="
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          border-radius: 8px;
        "
      />
    </div>
  </div>
</div>

<style>
  .page-root {
    padding: 2% 5%;
    height: 100%;
    overflow: hidden;
    gap: 12px;
  }

  .hint-card {
    width: 100%;
    padding: 24px 32px;
  }

  .main-card {
    flex: 1;
    min-height: 0;
    padding: 32px;
    align-items: center;
    gap: 48px;
  }

  .identity-name {
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .image-card {
    flex: 1;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    max-width: 50%;
  }
</style>

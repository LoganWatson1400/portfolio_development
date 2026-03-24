<div class="page-root flex col">
  <div class="card secondary"
    style="
      width: 100%;
      padding: 24px 32px;
    ">
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

  <div class="card secondary flex"
      style="
        width: 100%;
        padding: 32px;
        align-items: center;
        gap: 48px;
        flex-wrap: wrap;
      ">
    <div
      class="flex col"
      style="
        flex: 2; 
        gap: 12px; 
        min-width: 200px;
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
      <hr class="divider white"/>
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
      <div class="flex" style="gap: 12px; flex-wrap: wrap; justify-content: center;">
        <a href="/about"><button class="btn">About</button></a>
        <a href="/projects"><button class="btn">Projects</button></a>
        <a href="/contact"><button class="btn">Contact</button></a>
      </div>
    </div>

      <img
        src="/img/dragon.jpg"
        alt=""
        style="
          flex: 1 1 300px;
          min-width: 200px;
          object-fit: cover; 
          border-radius: 8px;
        "
      />
  </div>
</div>

<style>
  .page-root {
    display: flex;
    flex-wrap: wrap;
    padding: 2% 5%;
    height: fit-content;
    width: 90%;
    justify-self: center;
    overflow: scroll;
    gap: 12px;
  }

  .identity-name {
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

</style>

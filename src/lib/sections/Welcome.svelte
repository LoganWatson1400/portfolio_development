<section id="Welcome">
  
  <div
    class="flex"
    style="flex-wrap: wrap; justify-content: center; padding: 0px 5%;"
  >
    <div class="flex col" style="flex: 1 1 200px;  max-width: 600px; max-width: 80%;">
      <div class="card secondary">
        <p style="font-size: 1.8rem">
          <b><u>Welcome to my portfolio.</u></b>
        </p>
        <ul
          style="font-size: clamp(1rem, 2vw, 1.4rem); margin-top: 8px; padding-left: 20px;"
        >
          <li>
            Type <strong class="highlight">ls</strong>
            to list pages
          </li>
          <li>
            Type
            <strong class="highlight">cat &lt;file&gt;</strong>
            to read a file
          </li>
          <li>
            Type <strong class="highlight">cd &lt;dir&gt;</strong>
            to navigate directories
          </li>
        </ul>
        <p style="font-size: clamp(1rem, 2vw, 1.4rem); margin-top: 8px;">
          <br/>You can also click the commands on the panel to the right.<br/><br/>
          Alternatively, you can click the button at the top to view a continuously scrolling page.
        </p>
      </div>

      <div class="card secondary flex" style="gap: 24px; flex-wrap: wrap;">
        <div class="flex col" style="flex: 2; min-width: 200px;">
          <h1 style="font-size: clamp(2rem, 4vw, 3.2rem);">
            Logan<br />Watson
          </h1>
          <p>SOFTWARE ENGINEER</p>
          <hr class="divider white" />
          <p>
            CS student at UW-Milwaukee. I have experience in web apps, ML
            tools, and game development.
          </p>
          <div class="flex" style="flex-wrap: wrap; gap: 12px;">
            <a href="/about"><button class="btn">About</button></a>
            <a href="/projects"><button class="btn">Projects</button></a>
            <a href="/contact"><button class="btn">Contact</button></a>
          </div>
        </div>
      </div>
    </div>

    <div class="card secondary" style="flex: 1 1 300px; max-width: 400px; min-width: 300px;">
      <img
        src="/img/pfp.png"
        alt="Profile"
        style="
          width: 100%; 
          height: auto; 
          border-radius: 32px; 
          border: 10px var(--color-txt-highlight) solid;
          object-fit: cover;
        "
      />
    </div>
  </div>
</section>

<style>
  .highlight {
    color: var(--color-txt-highlight);
  }
  .card.secondary {
    padding: 24px 32px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>

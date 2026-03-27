<section
  id="Contact"
  style="
    padding: 0px 10%; 
    justify-self: center;
    width: 100%;
    max-width: 1300px;
    min-width: fit-content;
  "
>
  <div
    class="flex col"
    style="
      align-items: center; 
      padding: 0px 16px; 
      gap: 16px;
    "
  >
    <!------- Title Box --------->
    <h1 class="card secondary" style="padding: 2% 5%;">Contact Me</h1>

    <!------- Main Box --------->
    <div
      class="card secondary flex col"
      style="
        padding: 5% 10%; 
        gap: 16px; 
        width: 100%;
        align-items: center;
        text-align: center;
        font-size: 2rem;
      "
    >
      <div class="flex col" style="gap: 8px;">
        <h2 style="color: var(--color-txt-highlight);">Logan Watson</h2>
        <p style="font-size: 1.5rem;">Software Engineer</p>
      </div>

      <hr class="divider" />

      <div
        class="flex col"
        style="
          gap: 12px; 
          color: var(--color-txt-secondary);
          "
      >
        <a
          href="tel:+19203795628"
          class="contact-link flex"
          style="color: inherit; align-items: center;"
        >
          <img src="/img/phone.svg" alt="Phone" class="contact-icon" />
          +1 (920) 379-5628
        </a>
        <a
          href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&su=Professional+Inquiry&to=logan.ad.watson%2Bportfolio@outlook.com"
          target="_blank"
          rel="noopener"
          class="contact-link flex"
          style="color: inherit; align-items: center;"
        >
          <img src="/img/mail.svg" alt="Email" class="contact-icon" />
          logan.ad.watson@outlook.com
        </a>
        <a
          href="https://github.com/LoganWatson1400"
          target="_blank"
          rel="noopener"
          class="contact-link flex"
          style="color: inherit; align-items: center;"
        >
          <img src="/img/github.svg" alt="GitHub" class="contact-icon" />
          github/LoganWatson1400
        </a>
        <a
          href="https://linkedin.com/in/logan-ad-watson"
          target="_blank"
          rel="noopener"
          class="contact-link flex"
          style="color: inherit; align-items: center;"
        >
          <img src="/img/linkedin.svg" alt="LinkedIn" class="contact-icon" />
          linkedin/logan-ad-watson
        </a>
      </div>

      <hr class="divider" />

      <div class="flex" style="align-items: center;">
        <span class="status-dot"></span>
        <p style="color: var(--color-txt-secondary);">
          Available for opportunities
        </p>
      </div>

      <hr class="divider" />

      <div class="flex">
        <a
          href="/Logan_Watson_Resume.pdf"
          target="_blank"
          style="flex: 4 4 auto;"
        >
          <button class="btn highlight" style="width: 100%; font-size: inherit;"
            >Resume</button
          >
        </a>
        <div style="flex: 3;"></div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-icon {
    width: 1rem;
    height: 1rem;
    filter: invert(1);
    flex-shrink: 0;
  }

  .contact-link:hover {
    color: var(--color-txt-primary) !important;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-txt-success);
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

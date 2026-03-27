<script>
  import data from "$lib/data/experience.json";
</script>

<section id="Experience">
  <div class="page flex col">
    <section>
      <h2>Education</h2>
      {#each data.education as edu}
        <div class="card secondary entry">
          <div
            class="flex"
            style="justify-content: space-between; align-items: center;"
          >
            <strong>{edu.school}</strong>
            <span style="color: var(--color-txt-secondary); font-size: 0.85rem;"
              >{edu.date}</span
            >
          </div>
          <p style="margin-top: 4px;">{edu.degree}</p>
          <p class="courses">{edu.courses.join(" · ")}</p>
        </div>
      {/each}
    </section>

    <section>
      <h2>Work Experience</h2>
      {#each data.work as job}
        <div class="card secondary entry">
          <div
            class="flex"
            style="justify-content: space-between; align-items: center;"
          >
            <strong
              >{job.company}
              <span style="color: var(--color-txt-secondary);"
                >: {job.location}</span
              ></strong
            >
            <span style="color: var(--color-txt-secondary); font-size: 0.85rem;"
              >{job.date}</span
            >
          </div>
          <p
            style="color: var(--color-txt-highlight); font-size: 0.9rem; margin: 4px 0 8px;"
          >
            {job.title}
          </p>
          <ul>
            {#each job.bullets as b}
              <li>{b}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>
  </div>
</section>

<style>
  .page {
    max-width: 1000px;
    margin: 2rem auto;
    gap: 2rem;
  }

  h2 {
    font-size: 2rem;
    color: var(--color-txt-highlight);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }

  section {
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .entry {
    padding: 14px 16px;
    width: 100%;
  }

  ul {
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li {
    font-size: 1.2rem;
    color: var(--color-txt-secondary);
  }

  .courses {
    margin-top: 6px;
    font-size: 0.8rem;
    color: var(--color-txt-secondary);
  }
</style>

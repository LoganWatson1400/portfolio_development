<script>
  import data from '../../lib/data/experience.json';
</script>

<div class="page flex col">

  <section>
    <h2>Education</h2>
    {#each data.education as edu}
      <div class="card secondary entry">
        <div class="flex" style="justify-content: space-between; align-items: center;">
          <strong>{edu.school}</strong>
          <span style="color: var(--color-txt-secondary); font-size: 0.85rem;">{edu.date}</span>
        </div>
        <p style="margin-top: 4px;">{edu.degree}</p>
        <p class="courses">{edu.courses.join(' · ')}</p>
      </div>
    {/each}
  </section>

  <section>
    <h2>Work Experience</h2>
    {#each data.work as job}
      <div class="card secondary entry">
        <div class="flex" style="justify-content: space-between; align-items: center;">
          <strong>{job.company} <span style="color: var(--color-txt-secondary);">— {job.location}</span></strong>
          <span style="color: var(--color-txt-secondary); font-size: 0.85rem;">{job.date}</span>
        </div>
        <p style="color: var(--color-txt-highlight); font-size: 0.9rem; margin: 4px 0 8px;">{job.title}</p>
        <ul>
          {#each job.bullets as b}
            <li>{b}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section>
    <h2>Projects</h2>
    {#each data.projects as proj}
      <div class="card secondary entry">
        <div class="flex" style="justify-content: space-between; align-items: center;">
          <strong>{proj.name}</strong>
          {#if proj.github}
            <a href={proj.github} target="_blank" rel="noopener noreferrer"
              style="font-size: 0.85rem; color: var(--color-txt-highlight);">GitHub ↗</a>
          {/if}
        </div>
        <p style="margin-top: 6px; color: var(--color-txt-secondary); font-size: 0.9rem;">{proj.description}</p>
      </div>
    {/each}
  </section>

  <section>
    <h2>Skills</h2>
    <div class="card secondary entry">
      {#each Object.entries(data.skills) as [category, items]}
        <div class="skill-row">
          <span class="skill-label">{category}</span>
          <span style="color: var(--color-txt-secondary);">{items.join(', ')}</span>
        </div>
      {/each}
    </div>
  </section>

</div>

<style>
  .page {
    max-width: 720px;
    margin: 2rem auto;
    gap: 2rem;
  }

  h2 {
    font-size: 1.1rem;
    color: var(--color-txt-highlight);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }

  section {
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
    font-size: 0.9rem;
    color: var(--color-txt-secondary);
  }

  .courses {
    margin-top: 6px;
    font-size: 0.8rem;
    color: var(--color-txt-secondary);
  }

  .skill-row {
    display: flex;
    gap: 12px;
    padding: 4px 0;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .skill-row:last-child {
    border-bottom: none;
  }

  .skill-label {
    min-width: 160px;
    color: var(--color-txt-primary);
  }
</style>

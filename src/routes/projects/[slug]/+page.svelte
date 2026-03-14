<script>
  export let data;
  /*
  * "title": "E-Commerce Platforma",
  * "route": "ecommerceplatform",
  * "description": "A full-stack online shopping platform with payment integration and inventory management.Lorem ipsuLorem ipsum, dolor sit amet consectetur adipisicing elit. Unde beatae, iure aliquid odio id ratione, ullam deleniti nam maiores quas vitae aut adipisciipsam earum commodi officia necessitatm, dolor sit amet consectetur adipisicing elit. Unde beatae, iure aliquid odio id ratione, ullam deleniti nam maiores quas vitae aut adipisciipsam earum commodi officia necessitatibus sint. Iusto!",
  * "image": "/img/tmp.png",
  * "image_alt": "E-commerce Platform Img",
  * "tags": ["React", "Node.js", "MongoDB"],
  * "link": "ecommerce"
  */
</script>

<div id="Project Container"
  style="
    display: flex;
    flex-direction: column;
    gap: 16px;
">
  <div id="Header" 
    style="
      display: flex;
      align-items: center;
      gap: 8px;
  ">
    <h1 style="flex: 1 1 auto; text-align: center;">{data.project.title}</h1>
  
    {#if data.project.link}
      <a href={data.project.link} target="_blank" rel="noopener noreferrer" style="flex: 0 1 auto; display: flex;">
        <img src="/img/github.svg" alt="GitHub" style="width: 32px; height: 32px;" />
      </a>
    {/if}

    <button class="btn"
      style="
        flex: 0 1 auto;
        width: fit-content;
      ">
      <a href="/projects">back</a>
    </button>
  </div>
  <hr class="divider white" />
  {#if data.project.image == ""}
    <h3
      style="
      color: var(--color-txt-secondary); 
      padding: 20px;
      text-align: center;
    ">
      No Image Available
    </h3>
  {:else}
    <img
      src={data.project.image}
      alt={data.project.image_alt}
      style="width: 100%; padding: auto;">
  {/if}
  <hr class="divider white" />
  <p style="font-size: 32px; padding: 0px 32px;">{data.project.description}</p>
</div>
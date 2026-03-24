<script>
  let output = "";

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function typeChar(text) {
    for (const c of text) {
      output += c;
      await sleep(80);
    }
    output += "\n";
   await sleep(400);
  }

  async function run() {
    await typeChar("Wake up, Neo...");
    await typeChar("The Matrix has you...");
    await typeChar("Follow the white rabbit.");
  }

  run();
</script>

<p style="color: lime; white-space: pre-line;">{output}</p>

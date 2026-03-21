let cache = { data: null, fetchedAt: 0 };
const TTL = 60 * 60 * 1000;

async function getRoadmapProgress(username) {
  if (cache.data?.length && Date.now() - cache.fetchedAt < TTL) {
    console.log('[roadmap] returning cached data:', cache.data.length, 'skills');
    return cache.data;
  }

  console.log('[roadmap] fetching from roadmap.sh...');
  const html = await fetch(`https://roadmap.sh/u/${username}`).then(r => r.text());
  console.log('[roadmap] fetch successful, html length:', html.length);

  const results = [];
  for (const anchor of html.matchAll(/<a[^>]+href="\/[^"]+\?s=[^"]+"[^>]*>([\s\S]*?)<\/a>/g)) {
    const text = anchor[1].replace(/<[^>]+>/g, '').trim();
    const m = text.match(/^(.*?)(\d+)%$/);
    if (m) results.push({ skill: m[1].trim(), percent: parseInt(m[2]) });
  }

  console.log('[roadmap] parsed skills:', results);

  cache = { data: results, fetchedAt: Date.now() };
  return results;
}

export async function load() {
  console.log('Try Load...');
  return { skills: await getRoadmapProgress('loganwatson') };
}
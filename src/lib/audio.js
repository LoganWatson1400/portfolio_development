const sounds = {
  bleep: '/sounds/bleep.mp3',
  click: '/sounds/click.mp3',
};

// Only create audio objects in the browser
const audioObjects = {};

if (typeof window !== 'undefined') {
  for (const key in sounds) {
    const audio = new Audio(sounds[key]);
    audio.preload = 'auto';
    audioObjects[key] = audio;
  }
}

export function playSound(name) {
  if (typeof window === 'undefined') return; // prevent SSR errors

  const audio = audioObjects[name];
  if (!audio) {
    console.warn(`Sound "${name}" not found`);
    return;
  }

  const clone = audio.cloneNode(true);
  clone.play().catch(err => console.error(err));
}

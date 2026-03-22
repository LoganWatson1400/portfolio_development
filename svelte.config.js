import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'  // <-- SPA mode
    }),
    paths: {
      base: '' // root
    }
  }
};

export default config;
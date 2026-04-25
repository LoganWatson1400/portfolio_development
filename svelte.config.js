import adapter from '@sveltejs/adapter-auto';

const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: ''
    }
  }
};

export default config;
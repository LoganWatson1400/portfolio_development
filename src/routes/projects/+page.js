import projectsData from '$lib/data/projects.json';

export function load() {
  return {
    projects: projectsData
  };
}

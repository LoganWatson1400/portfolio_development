import { getProjects } from "$lib/server/projects.js";

export function load() {
  return {
    projects: getProjects()
  };
}
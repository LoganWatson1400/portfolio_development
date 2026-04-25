import { getProjects } from "$lib/server/projects.js";
import skills from "$lib/data/skills.json";

export async function load() {
  return {
    skills,
    projects: getProjects()
  };
}

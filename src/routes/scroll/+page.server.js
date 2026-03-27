import { getRoadmapProgress } from "$lib/server/roadmap.js";
import { getProjects } from "$lib/server/projects.js";

export async function load() {
  return {
    skills: await getRoadmapProgress("loganwatson"),
    projects: getProjects()
  };
}
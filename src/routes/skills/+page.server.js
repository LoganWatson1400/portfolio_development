import { getRoadmapProgress } from "$lib/server/roadmap";
import { getProjects } from "$lib/server/projects";

export async function load() {
  const [skills, projects] = await Promise.all([
    getRoadmapProgress("loganwatson"),
    getProjects()
  ]);

  return { skills, projects };
}

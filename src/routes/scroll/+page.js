import skills from "$lib/data/skills.json";
import projects from "$lib/data/projects.json";

export async function load() {
  return { skills, projects };
}
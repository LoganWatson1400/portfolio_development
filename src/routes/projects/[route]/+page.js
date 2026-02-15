import projects from '$lib/data/projects.json';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const project = projects.find((p) => p.route === params.route);
  if (!project) throw error(404, 'Project not found');
  return { project };
}

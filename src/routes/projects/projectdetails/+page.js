import { error } from '@sveltejs/kit';
import projectsData from '$lib/data/projects.json';

export function load({ params }) {
  const project = projectsData.projects.find(p => p.route === params.slug);
  
  if (!project) {
    throw error(404, 'Project not found');
  }
  
  return { project };
}

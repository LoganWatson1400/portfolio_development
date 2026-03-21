import projectsData from '$lib/data/projects.json';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const project = projectsData.find(p => 
    p.route.replace('projects/', '') === params.slug ||
    p.route === params.slug
  );
  
  if (!project) {
    throw error(404, 'Project not found');
  }
  
  return {
    project
  };
}

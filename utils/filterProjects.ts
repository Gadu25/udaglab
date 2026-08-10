import type { Project, ProjectCategory, ProjectStatus } from '../types/project'

export interface ProjectFilters {
  query?: string
  status?: ProjectStatus | 'all'
  category?: ProjectCategory | 'all'
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  const term = (filters.query ?? '').trim().toLowerCase()
  return projects.filter((project) => {
    if (filters.status && filters.status !== 'all' && project.status !== filters.status) return false
    if (filters.category && filters.category !== 'all' && project.category !== filters.category) return false
    if (!term) return true
    const haystack = [project.name, project.description, project.category, project.status, ...project.tech]
      .join(' ')
      .toLowerCase()
    return haystack.includes(term)
  })
}
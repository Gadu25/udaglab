import { computed, ref } from 'vue'
import type { Project, ProjectCategory, ProjectStatus } from '../types/project'
import { filterProjects } from '../utils/filterProjects'

export const useProjectFilter = (projects: Ref<Project[]>) => {
  const query = ref('')
  const status = ref<ProjectStatus | 'all'>('all')
  const category = ref<ProjectCategory | 'all'>('all')

  const results = computed(() =>
    filterProjects(projects.value, {
      query: query.value,
      status: status.value,
      category: category.value,
    }),
  )

  const categories = computed<ProjectCategory[]>(() =>
    Array.from(new Set(projects.value.map((p) => p.category))),
  )

  const hasActiveFilter = computed(
    () => query.value.trim() !== '' || status.value !== 'all' || category.value !== 'all',
  )

  const clearFilters = () => {
    query.value = ''
    status.value = 'all'
    category.value = 'all'
  }

  return { query, status, category, results, categories, hasActiveFilter, clearFilters }
}
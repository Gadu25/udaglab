<template>
  <section id="projects" class="projects">
    <div class="projects__container">
      <h2 class="projects__title">Projects</h2>
      <FilterBar
        v-model:query="query"
        v-model:status="status"
        v-model:category="category"
        :categories="categories"
        :statuses="statusOptions"
        :result-count="results.length"
      />

      <template v-if="results.length > 0">
        <div class="projects__grid">
          <ProjectCard
            v-for="project in results"
            :key="project.name"
            :project="project"
            :link-status="statusOf(project.url)"
          />
        </div>
      </template>
      <p v-else class="projects__empty">No experiments match your filter.</p>

      <button v-if="hasActiveFilter" class="projects__clear" type="button" @click="clearFilters">
        Clear filters
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import projectsData from '~/data/projects'
import type { LinkStatus, Project, ProjectStatus } from '~/types/project'

const projects = ref<Project[]>(projectsData as Project[])
const statusOptions: ProjectStatus[] = ['live', 'beta', 'stale', 'experiment']

const { query, status, category, results, categories, hasActiveFilter, clearFilters } = useProjectFilter(projects)
const { statuses } = useSiteStatuses()

const statusOf = (url: string): LinkStatus => statuses.value[url] ?? 'unknown'
</script>
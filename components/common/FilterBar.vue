<template>
  <div class="filter-bar">
    <div class="filter-bar__search">
      <input
        v-model="query"
        class="filter-bar__input"
        type="text"
        placeholder="Search by name, tech, or keyword..."
        aria-label="Search projects"
      />
    </div>

    <div class="filter-bar__group">
      <span class="filter-bar__label">Status</span>
      <button
        v-for="option in ['all', ...props.statuses]"
        :key="option"
        class="filter-bar__chip"
        :class="{ 'filter-bar__chip--active': status === option }"
        type="button"
        @click="status = option"
      >
        {{ option }}
      </button>
    </div>

    <div class="filter-bar__group">
      <span class="filter-bar__label">Category</span>
      <button
        v-for="option in ['all', ...props.categories]"
        :key="option"
        class="filter-bar__chip"
        :class="{ 'filter-bar__chip--active': category === option }"
        type="button"
        @click="category = option"
      >
        {{ option }}
      </button>
    </div>

    <small class="filter-bar__count">{{ props.resultCount }} {{ props.resultCount === 1 ? 'experiment' : 'experiments' }}</small>
  </div>
</template>

<script setup lang="ts">
import type { ProjectCategory, ProjectStatus } from '~/types/project'

const query = defineModel<string>('query', { default: '' })
const status = defineModel<ProjectStatus | 'all'>('status', { default: 'all' })
const category = defineModel<ProjectCategory | 'all'>('category', { default: 'all' })

const props = defineProps<{
  categories: ProjectCategory[]
  statuses: ProjectStatus[]
  resultCount: number
}>()
</script>
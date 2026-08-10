<template>
  <span class="status-badge" :class="`status-badge--${status}`">{{ label }}</span>
</template>

<script setup lang="ts">
import type { ProjectStatus } from '~/types/project'

const props = defineProps<{
  status: ProjectStatus
}>()

const labels: Record<ProjectStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  stale: 'Stale',
  experiment: 'Experiment',
}

const label = computed(() => labels[props.status])
</script>
<template>
  <article class="project-card">
    <div class="project-card__head">
      <div class="project-card__status-line">
        <StatusDot :status="linkStatus ?? 'unknown'" />
      </div>
      <StatusBadge :status="project.status" />
    </div>

    <h3 class="project-card__title">{{ project.name }}</h3>
    <p class="project-card__desc">{{ project.description }}</p>

    <ul class="project-card__tech">
      <li v-for="tech in project.tech" :key="tech" class="project-card__tech-item">
        <small>{{ tech }}</small>
      </li>
    </ul>

    <div class="project-card__actions">
      <a
        v-if="project.url"
        class="project-card__link"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open &rarr;
      </a>
      <a
        v-if="project.githubUrl"
        class="project-card__gh"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>code</small>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { LinkStatus, Project } from '~/types/project'

defineProps<{
  project: Project
  linkStatus?: LinkStatus
}>()
</script>
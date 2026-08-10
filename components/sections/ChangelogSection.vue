<template>
  <section id="experiments" class="changelog">
    <div class="changelog__container">
      <h2 class="changelog__title">Experiments log</h2>
      <ol class="changelog__list">
        <li v-for="entry in entries" :key="entry.title" class="changelog__item">
          <time class="changelog__date" :datetime="entry.date">{{ formatDate(entry.date) }}</time>
          <div class="changelog__content">
            <h3 class="changelog__heading">{{ entry.title }}</h3>
            <p class="changelog__body">{{ entry.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import changelogData from '~/data/changelog'
import type { ChangelogEntry } from '~/types/project'
import { sortChangelogNewestFirst } from '~/utils/sortChangelog'

const entries = sortChangelogNewestFirst(changelogData as ChangelogEntry[])

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[month - 1]} ${day}, ${year}`
}
</script>
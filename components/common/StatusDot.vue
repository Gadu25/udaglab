<template>
  <span class="status-dot" :class="`status-dot--${status}`" :title="`link ${status}`" />
</template>

<script setup lang="ts">
import type { LinkStatus } from '~/types/project'

defineProps<{
  status: LinkStatus
}>()
</script>
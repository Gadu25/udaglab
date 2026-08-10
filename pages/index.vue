<template>
  <div class="index">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <!-- <ChangelogSection /> -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'UdagLab',
  description: 'UdagLab — where ideas become experiments.',
  ogTitle: 'UdagLab',
  ogDescription: 'The home of Alexander Udag\u2019s hobby projects and experiments.',
  ogUrl: 'https://udaglab.com/',
  twitterTitle: 'UdagLab',
  twitterDescription: 'Where ideas become experiments.',
  twitterCard: 'summary',
  ogImage: '/images/app-icon.png',
})

useHead({
  htmlAttrs: { lang: 'en' },
})
</script>

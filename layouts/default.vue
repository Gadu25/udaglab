<template>
  <div class="layout">
    <Navigation />
    <main class="layout__main">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from '~/layouts/Navigation.vue'
import Footer from '~/layouts/Footer.vue'
</script>
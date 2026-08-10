<template>
  <footer class="footer">
    <div class="footer__container">
      <small>&copy; {{ year }} UdagLab — Alexander Udag</small>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border-color);
  padding: 40px 0;
}

.footer__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__links">
        <a href="https://alexander.udaglab.com" target="_blank" rel="noopener noreferrer">Portfolio</a>
        <a href="https://github.com/Gadu25" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://megome.udaglab.com" target="_blank" rel="noopener noreferrer">Megome</a>
      </div>
      <small class="footer__copy">&copy; {{ year }} UdagLab — Alexander Udag</small>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
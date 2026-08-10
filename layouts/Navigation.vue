<template>
  <nav class="nav">
    <div class="nav__container">
      <a class="nav__brand" href="/">UdagLab</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
}

.nav__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
}

.nav__brand {
  font-weight: 600;
  letter-spacing: -0.01em;
}
</style>
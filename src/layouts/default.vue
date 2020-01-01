<template>
  <nuxt />
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body,
#__layout,
#__nuxt {
  font-family: "Dosis", sans-serif;
  padding: 0;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.container {
  background: rgba(#ccc, 0.25);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@import "./_global.scss";
</style>

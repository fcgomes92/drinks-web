<template>
  <div class="container">
    <div class="container__text">{{ message }}</div>
      <nuxt-link to="/client/123">Client 123</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "CLIENT"
    };
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
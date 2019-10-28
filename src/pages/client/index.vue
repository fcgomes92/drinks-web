<template>
  <div class="container">
    <div class="container__text">{{ message }}</div>
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
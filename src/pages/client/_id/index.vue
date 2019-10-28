<template>
  <div>{{ message }}</div>
</template>

<script>
console.log(this);
export default {
  name: "client-id",
  validate({ params }) {
    return /^\w+$/.test(params.id);
  },
  data() {
    return {
      message: `${this.$route.params.id}`
    };
  }
};
</script>

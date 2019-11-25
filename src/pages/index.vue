<template>
  <div class="container">
    <LocaleSelector />
    <Login />
  </div>
</template>

<script>
import LocaleSelector from "../components/LocaleSelector";
import Login from "../components/Login";

export default {
  name: "Client",
  components: { LocaleSelector, Login },
  methods: {},
  mounted() {},
  data() {
    return {};
  }
};
</script>

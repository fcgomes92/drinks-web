<template>
  <div class="container">
    <LocaleSelector />
    <p>{{ $t("hello") }}</p>
    <form @submit="submit" action method="post">
      <label>
        Login:
        <input name="login" required v-model="login" />
      </label>
      <label>
        Password:
        <input name="password" required v-model="password" type="password" />
      </label>
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>
import LocaleSelector from "../../components/LocaleSelector";
export default {
  name: "Client",
  components: { LocaleSelector },
  methods: {
    submit(e) {}
  },
  data() {
    return {
      langs: ["en", "ptBR"],
      login: "gomes",
      password: "gomes",
      message: "CLIENT"
    };
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
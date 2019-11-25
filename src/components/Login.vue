<template>
  <div class="container">
    <form
      v-on:submit.prevent="handleLogin"
      :disabled="loading"
      class="login__form"
    >
      <label class="input">
        <input required type="text" name="username" v-model="email" />
        <span class="input__label">Email:</span>
      </label>
      <label class="input">
        <input required type="password" name="password" v-model="password" />
        <span class="input__label">Password:</span>
      </label>
      <button
        class="button"
        type="submit"
        :disabled="loading"
        v-bind:class="{ 'button--loading': loading }"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { ClientWebSocket } from "./ClientWebSocket";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  components: {},
  methods: {
    onSocketOpen(data) {
      console.log("open");
    },
    onSocketMessage(data) {
      console.log(data);
    },
    onSocketClose(data) {
      console.log("close");
    },
    handleAuthStateChange(user) {
      if (user) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    },
    async handleLogin() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    try {
      firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
    } catch (err) {}
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      email: "",
      password: ""
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
  width: 100%;
  justify-content: center;
  background: rgba(#ccc, 0.25);
}

.login {
  $fieldDistance: 0.5rem 0;
  $color: rgba(100, 10, 120, 1);

  &__form {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-sizing: border-box;
    min-width: 10rem;
    min-height: 3rem;
    padding: 2.4rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 0 0 lighten($color, 48);
  }
}
</style>

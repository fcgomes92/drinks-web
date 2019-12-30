<template>
  <Card>
    <template #content>
      <form class="form" v-on:submit.prevent="handleLogin" :disabled="loading">
        <Input
          label="Email:"
          required
          type="text"
          name="email"
          v-model="email"
        />
        <Input
          label="Password:"
          required
          type="password"
          name="password"
          v-model="password"
        />
        <Button type="submit" :disabled="loading" :loading="loading">
          Login
        </Button>
      </form>
    </template>
  </Card>
</template>

<script>
import { ClientWebSocket } from "./ClientWebSocket";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  middleware: 'anonymous',
  components: {
    Button,
    Input,
    Card
  },
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
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    }
  },
  mounted() {
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      email: "fcgomes.92@gmail.com",
      password: "qwe123"
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

.form {
  display: flex;
  flex-direction: column;
}
</style>

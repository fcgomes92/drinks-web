<template>
  <div class="container">
    <LocaleSelector />
    <div>
      <div>
        <form v-on:submit.prevent="handleLogin">
          <label>
            Email:
            <input required type="text" name="username" v-model="email" />
          </label>
          <label>
            Password:
            <input
              required
              type="password"
              name="password"
              v-model="password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
      <!-- <form v-on:submit.prevent="handleRegisterUsername">
        <label>
          Username:
          <input required type="text" name="username" v-model="username" />
        </label>
        <button type="submit">Set Username</button>
      </form> -->
    </div>
    <ul>
      Servers:
      <li v-for="(ley, server) in servers" :key="server">{{ key }}</li>
    </ul>
  </div>
</template>

<script>
import LocaleSelector from "../../components/LocaleSelector";
import { ClientWebSocket } from "../../components/ClientWebSocket";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Client",
  components: { LocaleSelector },
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
    handleRegisterUsername() {
      this.ws.handleRegisterUsername({ username: this.username });
    },
    handleAuthStateChange(user) {
      if (user) {
        this.user = user;
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
            console.log(idToken);
          })
          .catch(function(error) {
            // Handle error
          });
      }
    },
    async handleLogin() {
      console.log("auth");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          consle.log(error);
        });
    }
  },
  mounted() {
    const firebaseConfig = {
      apiKey: "AIzaSyAS2rStpYd4V7iYNQsULQ_jkOu1C64-lio",
      authDomain: "drinks-e0b36.firebaseapp.com",
      databaseURL: "https://drinks-e0b36.firebaseio.com",
      projectId: "drinks-e0b36",
      storageBucket: "drinks-e0b36.appspot.com",
      messagingSenderId: "714959229889",
      appId: "1:714959229889:web:68fe347daafbc351705540"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);

    this.ws = ClientWebSocket({
      url: "ws://localhost:8999",
      onOpen: this.onSocketOpen,
      onClose: this.onSocketClose,
      onMessage: this.onSocketMessage
    });
  },
  data() {
    return {
      email: "fcgomes.92@gmail.com",
      password: "batata@drinks",
      ws: null,
      username: "",
      clients: [],
      servers: [],
      user: null
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

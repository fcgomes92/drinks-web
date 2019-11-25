<template>
  <nuxt />
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    handleAuthStateChange(user) {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            this.$store.commit("auth/login", { user, idToken });
            this.$router.push("/select");
            // this.ws = ClientWebSocket({
            //   url: `ws://localhost:8000/api/v1/servers/f1260ed1-2b2d-49a2-b744-a103d1246a42/connect?password=qwe123&token=${idToken}`,
            //   onOpen: this.onSocketOpen,
            //   onClose: this.onSocketClose,
            //   onMessage: this.onSocketMessage
            // });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$router.push("/");
      }
    }
  },
  created() {
    try {
      console.log("MOUNTING!");
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
    } catch (err) {
      console.log(err);
    }
  }
};
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

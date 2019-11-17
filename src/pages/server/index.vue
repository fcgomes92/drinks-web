<template>
  <div class="container">
    <LocaleSelector />
    <div>
      <form v-on:submit.prevent="handleRegisterServer">
        <label>
          Username:
          <input required type="text" name="username" v-model="username" />
        </label>
        <button type="submit">Set Server Name</button>
      </form>
    </div>
    <ul v-if="true">
      Clients:
      <li v-for="server in servers" :key="server.username">{{server.username}}</li>
    </ul>
  </div>
</template>

<script>
import LocaleSelector from "../../components/LocaleSelector";
import { ServerWebSocket } from "../../components/ServerWebSocket";

export default {
  name: "Server",
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
    handleRegisterServer() {
      this.ws.registerServer({ username: this.username });
    }
  },
  mounted() {
    this.ws = ServerWebSocket({
      url: "ws://localhost:8999",
      onOpen: this.onSocketOpen,
      onClose: this.onSocketClose,
      onMessage: this.onSocketMessage
    });
  },
  data() {
    return {
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
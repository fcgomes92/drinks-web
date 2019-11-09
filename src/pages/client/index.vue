<template>
  <div class="container">
    <LocaleSelector />
    <div>
      <form v-on:submit.prevent="handleRegisterUsername">
        <label>
          Username:
          <input required type="text" name="username" v-model="username" />
        </label>
        <button type="submit">Set Username</button>
      </form>
    </div>
    <ul>
      Clients:
      <li v-for="client in clients" :key="client.username">{{client.username}}</li>
    </ul>
    <ul>
      Servers:
      <li v-for="server in servers" :key="server.username">{{server.username}}</li>
    </ul>
  </div>
</template>

<script>
import LocaleSelector from "../../components/LocaleSelector";
const parseData = (
  next,
  err = error => {
    console.error(error);
  }
) => event => {
  try {
    return next(event, JSON.parse(event.data));
  } catch (error) {
    return next(event, event.data);
  }
};
export default {
  name: "Client",
  components: { LocaleSelector },
  methods: {
    handleEvent(data) {
      const { type } = data;
      switch (type) {
        case "servers":
          this.servers = data.servers;
          break;
        case "clients":
          this.clients = data.clients;
          break;
        default:
          console.log(data);
      }
    },
    onSocketOpen(event, data) {
      this.handleEvent(data);
    },
    onSocketMessage(event, data) {
      this.handleEvent(data);
    },
    onSocketClose(event, data) {
      this.handleEvent(data);
    },
    handleRegisterUsername() {
      this.ws.send(
        JSON.stringify({
          data: {
            username: this.username
          },
          broadcast: true,
          type: "register_client"
        })
      );
    }
  },
  mounted() {
    this.ws = new WebSocket("ws://localhost:8999");
    this.ws.onopen = parseData(this.onSocketOpen);
    this.ws.onmessage = parseData(this.onSocketMessage);
    this.ws.onclose = parseData(this.onSocketClose);
  },
  data() {
    return {
      ws: null,
      username: "",
      clients: [],
      servers: []
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
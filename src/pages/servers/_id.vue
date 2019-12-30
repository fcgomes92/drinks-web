<template>
  <div class="container">
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="connected">
      <form class="form" @submit.prevent="handleServerMessage">
        <Input
          label="Type:"
          required
          type="text"
          name="messageType"
          v-model="messageType"
        />
        <Input
          label="Message:"
          required
          type="text"
          name="message"
          v-model="message"
        />
        <Button type="submit" :disabled="loading" :loading="loading">
          Send
        </Button>
      </form>
      <pre v-for="log in logMessage" :key="log.webId">{{ log.data }}</pre>
    </div>
    <form
      class="form"
      v-if="!connected && !loading"
      @submit.prevent="handleServerConnect"
    >
      <Input
        label="Password:"
        required
        type="text"
        name="serverPassword"
        v-model="serverPassword"
      />
      <Button type="submit" :disabled="loading" :loading="loading">
        Connect
      </Button>
    </form>
  </div>
</template>

<script>
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { WS } from "../../components/WebSocket";
import { mapGetters } from "vuex";

export default {
  name: "Server",
  components: {
    Input,
    Button,
    Loading
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    handleServerMessage() {
      this.ws.send({ message: this.message, type: this.messageType });
      this.message = "";
    },
    handleServerConnect() {
      this.ws = WS({
        url: `${process.env.wsUrl}v1/servers/${this.$route.params.id}/connect?token=${this.user.token}&password=${this.serverPassword}`,
        onClose: this.handleSocketClose,
        onOpen: this.handleSocketOpen,
        onMessage: this.handleSocketMessage
      });
    },
    handleSocketClose() {},
    handleSocketOpen() {},
    handleSocketMessage({ error, code, data, type, webId }, event) {
      switch (type) {
        case "connection":
          if (!error) {
            this.connected = true;
          }
          break;
        case "time":
          alert(data.now);
        default:
          this.logMessage.push({
            data: JSON.stringify({ error, code, data, type }),
            webId
          });
      }
    }
  },
  mounted() {
    this.loading = false;
  },
  data() {
    return {
      message: "",
      messageType: "time",
      logMessage: [],
      connected: false,
      loading: true,
      serverPassword: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
pre {
  max-width: 50vw;
  white-space: wrap;
  overflow: auto;
}
</style>

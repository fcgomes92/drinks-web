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
        <Input label="Message:" type="text" name="message" v-model="message" />
        <Button type="submit" :disabled="loading" :loading="loading">
          Send
        </Button>
      </form>
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
    <LogTable :messages="logMessage" />
  </div>
</template>

<script>
import LogTable from "../../components/LogTable";
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
    Loading,
    LogTable
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
          this.logMessage = [
            {
              data: JSON.stringify({ error, code, data, type }, null, 2),
              id: webId
            },
            ...this.logMessage
          ];
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
@import "../../layouts/_global";
.form {
  display: flex;
  flex-direction: column;
}
.log-list {
  max-width: 50vw;
  margin: 1rem 0;
  padding: 0;
  box-sizing: border-box;
  border-bottom: solid 1rem darken($color, 1);
  &__item {
    margin: 0;
    background-color: #fff;
    align-self: center;
    box-sizing: border-box;
    padding: 0.5rem;
    list-style: none;
    display: flex;
    overflow: auto;
    max-height: 100%;
    border: solid 0.2rem lighten($color, 48);
    border-top: solid 0.2rem darken($color, 1);
    transition: all 0.25s ease-in-out;
    &:hover {
      background-color: rgba(21, 21, 21, 0.05);
      border: solid 0.2rem lighten($color, 36);
    }
  }
}
</style>

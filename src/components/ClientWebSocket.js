import { parseData } from "../utils";

export const ClientWebSocket = ({ url, onClose, onOpen, onMessage }) => {
  const handleEvent = (data = { type: null }) => {
    const { type } = data;

    switch (type) {
      case "servers":
        return data.servers;
      case "clients":
        return data.clients;
      default:
        return data;
    }
  };

  const onSocketOpen = (event, data) => {
    onOpen(handleEvent(data));
  };
  const onSocketMessage = (event, data) => {
    onMessage(handleEvent(data));
  };
  const onSocketClose = (event, data) => {
    onClose(handleEvent(data));
  };

  const _url = url;
  const ws = new WebSocket(_url);
  ws.onopen = parseData(onSocketOpen);
  ws.onmessage = parseData(onSocketMessage);
  ws.onclose = parseData(onSocketClose);

  return {
    ws,
    handleRegisterUsername({ username }) {
      this.ws.send(
        JSON.stringify({
          data: {
            username: username
          },
          broadcast: true,
          type: "register_client"
        })
      );
    }
  };
};

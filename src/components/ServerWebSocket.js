import { parseData } from "../utils";

export const ServerWebSocket = ({ url, onClose, onOpen, onMessage }) => {
  const handleEvent = (data = { type: null }) => {
    const { type } = data;
    console.log("sws", type, data);
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
    registerServer({ username }) {
      ws.send(
        JSON.stringify({
          data: {
            username: username
          },
          broadcast: true,
          type: "register_server"
        })
      );
    }
  };
};

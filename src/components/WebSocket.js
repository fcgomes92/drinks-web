import parseData from "../utils/parseData";

const ID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

export const WS = ({ url, onClose, onOpen, onMessage }) => {
  const onSocketOpen = (event, data) => {
    onOpen({ ...data, webId: ID() }, event);
  };
  const onSocketMessage = (event, data) => {
    onMessage({ ...data, webId: ID() }, event);
  };
  const onSocketClose = (event, data) => {
    onClose({ ...data, webId: ID() }, event);
  };

  const ws = new WebSocket(url);
  ws.onopen = parseData(onSocketOpen);
  ws.onmessage = parseData(onSocketMessage);
  ws.onclose = parseData(onSocketClose);

  return {
    ws,
    send(data) {
      return ws.send(JSON.stringify(data));
    },
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

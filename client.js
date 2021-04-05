var WebSocketClient = require("websocket").client;

var client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");

  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log(
        "Received from server: '" + typeof message.utf8Data + "'",
        message.utf8Data
      );
      if (message.utf8Data.length == 1) {
        let t = parseInt(message.utf8Data) * 2;
        connection.sendUTF(t);
      }
    }
  });
});

client.connect("ws://localhost:8080/", "echo-protocol");

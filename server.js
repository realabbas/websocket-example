var WebSocketServer = require("websocket").server;
var http = require("http");

var server = http.createServer(function (request, response) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on("request", function (request) {
  var arr = [1, 2, 3, 4, 5];
  if (!originIsAllowed(request.origin)) {
    request.reject();

    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  var connection = request.accept("echo-protocol", request.origin);
  console.log(new Date() + " Connection accepted.");
  function sendNumber() {
    if (connection.connected) {
      console.log("Data sending from Server", arr[0]);
      connection.sendUTF(arr[0]);
    }
  }
  sendNumber();

  connection.on("message", function (message) {
    console.log("MESSAGE", message);
    if (message.type === "utf8") {
      console.log("Received Message from Client: " + message.utf8Data);
      arr[0] = parseInt(message.utf8Data);
      connection.sendUTF(arr);
      console.log("Data at Server", arr);
    }
  });
  connection.on("close", function (reasonCode, description) {
    console.log(
      new Date() + " Peer " + connection.remoteAddress + " disconnected."
    );
  });
});

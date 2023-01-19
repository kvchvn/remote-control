import { httpServer } from "./src/http_server/index.js";
import {WebSocketServer} from "ws";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log('Received: ', data.toString());
    });
    ws.send('Hello World!')
});

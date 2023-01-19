import { createWebSocketStream, WebSocketServer } from 'ws';
import { BASE_URL } from './constants.js';
import handleCommands from './handlers/index.js';
import { parseData } from './helpers.js';
import { httpServer } from './http_server/index.js';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.send(`Connected_to_${BASE_URL}`);
  const wsStream = createWebSocketStream(ws, { encoding: 'utf-8' });

  wsStream.on('data', (data: string) => {
    console.log(data);
    const { mainCommand, subCommand, params } = parseData(data);

    handleCommands(mainCommand, subCommand, params)
      .then((result) => {
        const answer = result ? `${data} ${result}` : data;
        ws.send(answer);
      })
      .catch((err: Error) => console.log(`ERROR! ${err.message}`));
  });

  wsStream.on('error', (err) => {
    console.log(`ERROR! ${err.message}`);
  });
});

process.on('SIGINT', () => process.exit());

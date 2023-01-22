import Jimp from 'jimp';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { BASE_URL, PRINT_SCREEN_HEIGHT, PRINT_SCREEN_WIDTH } from './constants.js';
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
        if (typeof result === 'object' && 'buffer' in result && 'pixelDensity' in result) {
          const { buffer, pixelDensity } = result;
          const width = PRINT_SCREEN_WIDTH * pixelDensity.scaleX;
          const height = PRINT_SCREEN_HEIGHT * pixelDensity.scaleY;

          new Jimp(width, height, (err, image) => {
            if (err) throw err;
            image.bitmap.data = buffer;
            image
              .resize(PRINT_SCREEN_WIDTH, PRINT_SCREEN_HEIGHT)
              .getBase64(Jimp.MIME_PNG, (err, base64) => {
                if (err) throw err;
                const answer = `${data} ${base64.slice(base64.indexOf(',') + 1)}`;
                ws.send(answer);
              });
          });
        } else {
          const answer = result ? `${data} ${result}` : data;
          ws.send(answer);
        }
      })
      .catch((err: Error) => console.log(`ERROR! ${err.message}`));
  });

  wsStream.on('error', (err) => {
    console.log(`ERROR! ${err.message}`);
  });
});

process.on('SIGINT', () => process.exit());

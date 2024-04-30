const http = require('http');

const PORT = 1245;
const HOST = 'localhost';
/**
 * Create a small HTTP server.
 * @type {http.Server}
 */
const app = http.createServer();

app.on('request', (_, res) => {
  const responseBody = 'Hello Holberton School!';

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(responseBody));
  res.statusCode = 200;
  res.write(Buffer.from(responseBody));
  res.end();
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;

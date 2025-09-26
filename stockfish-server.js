const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/move') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { fen } = JSON.parse(body);
      const stockfish = spawn('stockfish');
      let bestmove = '';

      stockfish.stdout.on('data', data => {
        const line = data.toString();
        if (line.startsWith('bestmove')) {
          bestmove = line.split(' ')[1];
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ move: bestmove }));
          stockfish.kill();
        }
      });

      stockfish.stdin.write(`position fen ${fen}\n`);
      stockfish.stdin.write('go depth 12\n');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => console.log('Stockfish server running on port 3001'));
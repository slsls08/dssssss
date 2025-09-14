const WebSocket = require('ws');
const { spawn } = require('child_process');

const wss = new WebSocket.Server({ port: 8090 });

wss.on('connection', ws => {
  const stockfish = spawn('stockfish');

  stockfish.stdout.on('data', data => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.startsWith('bestmove')) {
        ws.send(JSON.stringify({ type: 'bestmove', move: line.split(' ')[1] }));
      }
    });
  });

  ws.on('message', message => {
    const data = JSON.parse(message);
    if (data.type === 'position') {
      stockfish.stdin.write(`position fen ${data.fen}\n`);
      stockfish.stdin.write('go movetime 1000\n');
    }
  });

  ws.on('close', () => {
    stockfish.kill();
  });
});

console.log('AI 서버가 8090 포트에서 실행 중입니다.');
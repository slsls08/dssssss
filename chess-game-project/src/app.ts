import express from 'express';
import { MultiplayerServer } from './multiplayer/server';
import { StockfishAI } from './ai/stockfish';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the multiplayer server
const multiplayerServer = new MultiplayerServer();
multiplayerServer.startServer(app);

// Initialize the Stockfish AI
const stockfishAI = new StockfishAI();
stockfishAI.initialize();

// Set up routes for multiplayer and AI functionalities
app.use(express.json());

app.post('/move', (req, res) => {
    const { move, player } = req.body;
    multiplayerServer.broadcastMove(move, player);
    res.send({ status: 'Move broadcasted' });
});

app.post('/ai/move', async (req, res) => {
    const bestMove = await stockfishAI.getBestMove();
    res.send({ move: bestMove });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
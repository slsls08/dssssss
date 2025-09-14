import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setRoutes } from './routes/index';
import { MultiplayerServer } from './multiplayer/server';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

// Initialize multiplayer server
const multiplayerServer = new MultiplayerServer(io);
multiplayerServer.start();

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
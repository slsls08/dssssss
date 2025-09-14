import WebSocket from 'ws';
import { GameController } from '../controllers/gameController';
import { GameState } from '../types';

export class MultiplayerServer {
    private wss: WebSocket.Server;
    private gameController: GameController;
    private clients: Map<WebSocket, string>;

    constructor(port: number) {
        this.wss = new WebSocket.Server({ port });
        this.gameController = new GameController();
        this.clients = new Map();

        this.wss.on('connection', (ws: WebSocket) => {
            this.handleConnection(ws);
        });

        console.log(`Multiplayer server is running on ws://localhost:${port}`);
    }

    private handleConnection(ws: WebSocket) {
        ws.on('message', (message: string) => {
            this.handleMessage(ws, message);
        });

        ws.on('close', () => {
            this.handleDisconnection(ws);
        });
    }

    private handleMessage(ws: WebSocket, message: string) {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'join':
                this.handleJoin(ws, data.playerName);
                break;
            case 'move':
                this.handleMove(ws, data.move);
                break;
            // Additional message types can be handled here
        }
    }

    private handleJoin(ws: WebSocket, playerName: string) {
        this.clients.set(ws, playerName);
        ws.send(JSON.stringify({ type: 'joined', playerName }));
        this.broadcast({ type: 'playerJoined', playerName });
    }

    private handleMove(ws: WebSocket, move: string) {
        const gameState: GameState = this.gameController.makeMove(move);
        this.broadcast({ type: 'moveMade', move, gameState });
    }

    private handleDisconnection(ws: WebSocket) {
        const playerName = this.clients.get(ws);
        if (playerName) {
            this.clients.delete(ws);
            this.broadcast({ type: 'playerLeft', playerName });
        }
    }

    private broadcast(data: any) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}
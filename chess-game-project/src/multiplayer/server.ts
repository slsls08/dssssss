import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Game } from '../chess/rules';
import { Player } from '../types';

export class MultiplayerServer {
    private app: express.Application;
    private server: http.Server;
    private io: Server;
    private games: Map<string, Game>;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.games = new Map();
    }

    public startServer(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        this.handleConnection();
    }

    private handleConnection(): void {
        this.io.on('connection', (socket) => {
            console.log('A player connected:', socket.id);

            socket.on('joinGame', (gameId: string, player: Player) => {
                this.joinGame(gameId, player, socket);
            });

            socket.on('makeMove', (gameId: string, move: any) => {
                this.handleMove(gameId, move, socket);
            });

            socket.on('disconnect', () => {
                console.log('A player disconnected:', socket.id);
            });
        });
    }

    private joinGame(gameId: string, player: Player, socket: any): void {
        if (!this.games.has(gameId)) {
            this.games.set(gameId, new Game());
        }
        const game = this.games.get(gameId);
        game.addPlayer(player);
        socket.join(gameId);
        this.io.to(gameId).emit('playerJoined', player);
    }

    private handleMove(gameId: string, move: any, socket: any): void {
        const game = this.games.get(gameId);
        if (game.isValidMove(move)) {
            game.makeMove(move);
            this.broadcastMove(gameId, move);
        } else {
            socket.emit('invalidMove', move);
        }
    }

    private broadcastMove(gameId: string, move: any): void {
        this.io.to(gameId).emit('moveMade', move);
    }
}
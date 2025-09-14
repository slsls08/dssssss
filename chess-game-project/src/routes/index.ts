import { Router } from 'express';
import { GameController } from '../controllers/gameController';

const router = Router();
const gameController = new GameController();

export function setRoutes(app) {
    app.use('/api/games', router);

    router.post('/start', (req, res) => {
        const { player1, player2 } = req.body;
        const game = gameController.startGame(player1, player2);
        res.status(201).json(game);
    });

    router.post('/move', (req, res) => {
        const { gameId, move } = req.body;
        const result = gameController.makeMove(gameId, move);
        if (result.error) {
            return res.status(400).json(result);
        }
        res.json(result);
    });
}
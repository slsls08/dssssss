class StockfishAI {
    private stockfish: any;

    constructor() {
        this.stockfish = null;
    }

    initialize(): void {
        this.stockfish = new Worker('path/to/stockfish.js'); // Adjust the path as necessary
        this.stockfish.postMessage('uci');
    }

    makeMove(move: string): void {
        if (this.stockfish) {
            this.stockfish.postMessage(`position fen ${move}`);
        }
    }

    getBestMove(callback: (move: string) => void): void {
        if (this.stockfish) {
            this.stockfish.onmessage = (event: MessageEvent) => {
                const message = event.data;
                if (message.startsWith('bestmove')) {
                    const bestMove = message.split(' ')[1];
                    callback(bestMove);
                }
            };
            this.stockfish.postMessage('go movetime 1000'); // Adjust time as necessary
        }
    }
}

export default StockfishAI;
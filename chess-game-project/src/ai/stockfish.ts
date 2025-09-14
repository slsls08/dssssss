class StockfishAI {
    private stockfish: any;

    constructor() {
        this.stockfish = null;
    }

    public init(): void {
        this.stockfish = new Worker('path/to/stockfish.js'); // Adjust the path as necessary
        this.stockfish.onmessage = this.onMessage.bind(this);
        this.stockfish.postMessage('uci');
    }

    private onMessage(event: MessageEvent): void {
        console.log('Stockfish:', event.data);
    }

    public sendMove(move: string): void {
        if (this.stockfish) {
            this.stockfish.postMessage(`position fen ${move}`);
            this.stockfish.postMessage('go');
        }
    }

    public getBestMove(callback: (move: string) => void): void {
        this.stockfish.onmessage = (event: MessageEvent) => {
            if (event.data.startsWith('bestmove')) {
                const bestMove = event.data.split(' ')[1];
                callback(bestMove);
            }
        };
    }
}

export default StockfishAI;
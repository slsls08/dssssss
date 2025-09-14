class Board {
    private board: string[][];

    constructor() {
        this.board = this.initializeBoard();
    }

    initializeBoard(): string[][] {
        const initialBoard = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        return initialBoard;
    }

    updateBoard(move: { from: string; to: string }): void {
        const { from, to } = move;
        const fromRow = 8 - parseInt(from[1]);
        const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
        const toRow = 8 - parseInt(to[1]);
        const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);

        this.board[toRow][toCol] = this.board[fromRow][fromCol];
        this.board[fromRow][fromCol] = '';
    }

    getBoardState(): string[][] {
        return this.board;
    }
}

export default Board;
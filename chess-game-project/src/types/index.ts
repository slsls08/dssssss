export interface Player {
    id: string;
    name: string;
    color: 'white' | 'black';
}

export interface Move {
    from: string; // e.g., "e2"
    to: string;   // e.g., "e4"
    promotion?: string; // e.g., "q" for queen promotion
}

export interface GameState {
    board: string[][];
    currentPlayer: 'white' | 'black';
    moves: Move[];
    isGameOver: boolean;
    winner?: 'white' | 'black' | 'draw';
}
export interface Player {
    id: string;
    name: string;
    color: 'white' | 'black';
}

export interface Move {
    from: string; // e.g., 'e2'
    to: string;   // e.g., 'e4'
    promotion?: string; // e.g., 'q' for promoting to a queen
}

export interface GameState {
    board: string[][];
    currentTurn: 'white' | 'black';
    moves: Move[];
    isCheck: boolean;
    isCheckmate: boolean;
    isStalemate: boolean;
}
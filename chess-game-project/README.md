# Chess Game Project

This project is a chess game that supports both multiplayer functionality and AI gameplay using the Stockfish engine. The application is built with TypeScript and follows the standard chess rules.

## Features

- **Multiplayer Mode**: Play against other players online.
- **AI Mode**: Play against the Stockfish chess engine.
- **Chess Rules Implementation**: Adheres to standard chess rules for valid moves and game status.

## Project Structure

```
chess-game-project
├── src
│   ├── app.ts               # Entry point of the application
│   ├── ai
│   │   └── stockfish.ts     # Integration with Stockfish AI engine
│   ├── multiplayer
│   │   └── server.ts        # Multiplayer server setup
│   ├── chess
│   │   ├── rules.ts         # Chess rules implementation
│   │   └── board.ts         # Chessboard representation
│   └── types
│       └── index.ts         # Type definitions and interfaces
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chess-game-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

## Usage

- To start a multiplayer game, connect to the server and follow the prompts.
- To play against the AI, select the AI mode and make your moves.

## License

This project is licensed under the MIT License.
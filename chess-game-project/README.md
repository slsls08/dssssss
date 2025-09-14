# Chess Game Project

This project is a chess game that supports both multiplayer functionality and gameplay against an AI powered by the Stockfish engine. 

## Features

- **Multiplayer Mode**: Play against other players in real-time using WebSocket for communication.
- **AI Mode**: Play against the Stockfish chess engine, which provides a challenging opponent.
- **Chess Rules Implementation**: The game adheres to standard chess rules, including move validation and check/checkmate conditions.

## Project Structure

```
chess-game-project
├── src
│   ├── app.ts                # Entry point of the application
│   ├── ai
│   │   └── stockfish.ts      # Integration with Stockfish AI engine
│   ├── multiplayer
│   │   └── server.ts         # WebSocket server for multiplayer
│   ├── chess
│   │   └── rules.ts          # Chess rules and logic
│   ├── controllers
│   │   └── gameController.ts  # Game flow management
│   ├── routes
│   │   └── index.ts          # API routes setup
│   └── types
│       └── index.ts          # Type definitions
├── package.json               # npm configuration and dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chess-game-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Ensure you have the Stockfish engine available. You can download it from [Stockfish GitHub](https://github.com/official-stockfish/Stockfish).

## Usage

To start the application, run:
```
npm start
```

You can then access the game through your web browser. Follow the on-screen instructions to either create a multiplayer game or play against the AI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
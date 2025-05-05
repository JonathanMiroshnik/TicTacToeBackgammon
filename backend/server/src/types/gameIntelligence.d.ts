export type TicTacToeGameMove = {
    positionX: number;
    positionY: number;
}

export type GameBoard = {
    board: string[][];
}

export interface GenerateGameMoveRequest {
    boardState: ??; 
    dice: number;
    symbol: string;
}

export interface GenerateGameMoveResponse {
  success: boolean;
  proposedMove: TicTacToeGameMove;
  error?: string;
}

// currentBoard, currentDice: number, currentSymbol
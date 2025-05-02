import { promptText } from "../controllers/llmController";
import { LLMService } from "./llmService";
import { GenerateGameMoveResponse } from "../types/gameIntelligence";

export async function chooseNextAction(currentBoard, currentDice: number, currentSymbol: 'X' | 'O'): Promise<GenerateGameMoveResponse> {
    // TODO: create request from current game state with proper prompt
    const request = 
    `
    You and a player are playing a board game.
    \n\n
    GAME RULES:\n

    Like Tic-Tac-Toe, there is a 3x3 board and two players, X and O.
    The Board is initialized as empty, without either X's or O's on it.

    The first player is X.
    On each turn, the current player rolls a single die. The number on the die is the number he can place on the board, along with his symbol.
    If a cell is empty, any player can lay claim to it -> 
        For example, if an empty cell is claimed by X, after he rolled a 3, the Cell will display X with a value of 3.
    If a cell is claimed:
    - If its number is 6, it cannot be changed any further.
    - If its number is below 6, there are two scenarios:
    1. The player of the same symbol can add further numbers he has rolled to it ->
        For example, if the cell had the symbol O with a number of 2, and the player O has rolled a 3, he can add to the cell, totalling 5.
                    In the same situation, if the player rolled a 5, he can add to the 2, but that will result in 6, being the maximum possible value for a cell.
    2. The player of the opposite symbol can conquer a cell by rolling a higher number than what is currently in the cell ->
        For example, if the cell had the symbol X with a number 3, and the Player O rolled a 4, he can take over the cell, and the final cell will have the symbol O with a value of 4.

    A victor is decided based on rows, columns, and diagonals, but only when all the relevant cells have a value of 6 ->
    For example, if there is a row of X's, but the middle X has a value of 5, this is not a winning row.
     If the row has the same symbol, and all of them have a value of six, the game ends and that symbol's player is declared the winner.
    \n\n
    YOUR GOAL:\n
    return a JSON in the format I shall present examples of to you, of the next best move that supports your symbol.
    Your symbol is: ${currentSymbol} 
    \n\n
    HOW THE INPUT OF THE GAME STATE LOOKS:\n
    The number on the dice: 1 to 6
    The current board state, row after row: [ Symbol Number, Symbol Number, Symbol Number ] [ Symbol Number, Symbol Number, Symbol Number ] [ Symbol Number, Symbol Number, Symbol Number ]
    Your symbol is: Symbol
    \n\n
    EXAMPLES OF PLAY:\n
    To help you understand the game, I shall give you several examples of a game state, how to think about it, and how you might respond to it.
    The number on the dice: 3
    The current board state, row after row: [ Symbol Number, Symbol Number, Symbol Number ] [ Symbol Number, Symbol Number, Symbol Number ] [ Symbol Number, Symbol Number, Symbol Number ]
    Your symbol is: O
    
    
    \n\n
    YOUR INPUT OF THE CURRENT GAME STATE:\n
    \n\n
    BASIC JSON FORMAT:\n
    The format shall have 2 
    \n\n
    EXAMPLES of JSON output:\n
    {
        positionX: 1;
        positionY: 0;
    },
    {
        positionX: 2;
        positionY: 2;
    },
    {
        positionX: 0;
        positionY: 2;
    }
    `;




    const llmServiceInst = new LLMService();
    return await llmServiceInst.generateContent(request);
}

function boardToText(currentBoard) {

}
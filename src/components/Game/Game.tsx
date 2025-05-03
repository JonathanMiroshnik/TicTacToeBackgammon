import { useState, useEffect } from "react";

import Board from "../Board/Board";
import Dice, { SIDES_TO_DICE } from "../Dice/Dice";
import WinnerOverlay from "../WinnerOverlay/WinnerOverlay";
import InformationOverlay from "../InformationOverlay/InformationOverlay";

import './Game.css'

export enum Symbols {
    X,
    O,
    _
}

export interface CellState {
    symbol: Symbols;
    totalDice: number;
}

type VictoryStatus = {
    victory: boolean; 
    symbol: Symbols;
}

const BOARD_SIDE_LENGTH = 3;
const START_PLAYER: CellState = { symbol: Symbols.X, totalDice: 0 };
const INITIAL_BOARD = Array.from({ length: BOARD_SIDE_LENGTH }, () => 
    Array.from({ length: BOARD_SIDE_LENGTH }, () => ({ 
        symbol: Symbols._, 
        totalDice: 0
    }))
);

function Game () {
    const [currentPlayer, setCurrentPlayer] = useState<CellState>({ ...START_PLAYER });
    const [victor, setVictor] = useState(Symbols._);
    const [boardCells, setBoardCells] = useState<CellState[][]>(INITIAL_BOARD);
    const [showInformation, setShowInformation] = useState(false);

    // Happens only once! creates board of certain sizes X and Y.
    useEffect(() => {
        resetGame();
        rollDice();
    }, []);    

    // After each change of the board, moves to the next round
    useEffect(() => {
        runGameRound();        
    }, [boardCells]);

    function resetCells() {
        setBoardCells([...INITIAL_BOARD.map((cellRow) => [...cellRow])])
    }

    function resetGame() {        
        setCurrentPlayer({ ...START_PLAYER });
        setVictor(Symbols._);
        resetCells();
    }

    function checkVictory(): VictoryStatus {
        if (BOARD_SIDE_LENGTH < 2) {
            throw new Error("The board must at least have 2 cells on each side");
        }

        let initialSymbol: Symbols = Symbols._;
        // Row victory
        for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
            initialSymbol = boardCells[i][0].symbol;
            for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                if (initialSymbol !== boardCells[i][j].symbol ||
                    boardCells[i][j].totalDice < SIDES_TO_DICE) {
                    break;
                }

                if (j === BOARD_SIDE_LENGTH-1) {
                    return {
                        victory: true,
                        symbol: initialSymbol
                    }
                }
            }
        }

        // Column Victory
        for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
            initialSymbol = boardCells[0][i].symbol;
            for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                if (initialSymbol !== boardCells[j][i].symbol ||
                    boardCells[j][i].totalDice < 6) {
                    break;
                }

                if (j === BOARD_SIDE_LENGTH-1) {
                    return {
                        victory: true,
                        symbol: initialSymbol
                    }
                }
            }
        }
        
        // Diagonal Victory
        // Top-left to Bottom-right
        initialSymbol = boardCells[0][0].symbol;
        for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
            if (initialSymbol !== boardCells[j][j].symbol ||
                boardCells[j][j].totalDice < 6) {
                break;
            }

            if (j === BOARD_SIDE_LENGTH-1) {
                return {
                    victory: true,
                    symbol: initialSymbol
                }
            }
        }

        // Top-right to Bottom-left
        initialSymbol = boardCells[BOARD_SIDE_LENGTH-1][0].symbol;
        for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
            if (initialSymbol !== boardCells[BOARD_SIDE_LENGTH-1-j][j].symbol ||
                boardCells[BOARD_SIDE_LENGTH-1-j][j].totalDice < 6) {
                break;
            }

            if (j === BOARD_SIDE_LENGTH-1) {
                return {
                    victory: true,
                    symbol: initialSymbol
                }
            }
        }

        return {
            victory: false,
            symbol: Symbols._
        };
    }

    function rollDice() {
        const newDice: number = Math.floor(Math.random() * SIDES_TO_DICE) + 1;
        setCurrentPlayer((prev) => ({symbol: prev.symbol, totalDice: newDice}));
    }

    function onCellClick(row: number, col: number, newCellState: CellState) {    
        // TODO: check for input errors

        // If the cell is already filled completely, it cannot be changed
        if (boardCells[row][col].totalDice === SIDES_TO_DICE) {
            return;
        }

        // If the symbol of the cell is the same as the one that wants to add to it
        if (boardCells[row][col].symbol === newCellState.symbol) {
            let updatedTotalDice: number = boardCells[row][col].totalDice + newCellState.totalDice;
            if (updatedTotalDice > SIDES_TO_DICE) {
                updatedTotalDice = SIDES_TO_DICE;
            }

            setSpecificBoardCell(row,col, { symbol: newCellState.symbol, totalDice: updatedTotalDice });
        }
        else {
            // If the new value is not greater than the previous value of the cell with an opposing symbol, 
            //  we do not change the symbol.
            if (boardCells[row][col].totalDice >= newCellState.totalDice) {
                return;
            }

            setSpecificBoardCell(row,col, { symbol: newCellState.symbol, totalDice: newCellState.totalDice });
        }
    }

    function setSpecificBoardCell(row: number, col: number, newCellState: CellState) {
        setBoardCells(prev => 
            prev.map((currentRow, rowIndex) => 
                rowIndex === row 
                    ? [...currentRow.map((cell, colIndex) => (colIndex === col 
                        ? { symbol: newCellState.symbol, totalDice: newCellState.totalDice }
                        : {...cell}))]
                    : [...currentRow]
            )
        );
    }

    function runGameRound() {                        
        // If there is a victory, we end the competition
        const victoryStatus: VictoryStatus = checkVictory();
        if (victoryStatus.victory) {
            setVictor(victoryStatus.symbol);
            return;
        }

        rollDice();

        // Flipping the symbol
        setCurrentPlayer(prev => (
            { symbol: (prev.symbol === Symbols.X ? Symbols.O : Symbols.X), 
              totalDice: prev.totalDice }
        ));
    }

    return (
        <div className="game_screen">
            <h1><b>TIC-TAC-שש-בש</b></h1>
            {/* TODO: When BOARD_SIDE_LENGTH is 2, the game_screen div changes size when I click a cell, but it works fine for BOARD_SIDE_LENGTH > 2 */}
            <div className="information-display-div">
                <button onClick={() => setShowInformation(true)} > ? </button>
            </div>            
            { showInformation &&  <InformationOverlay onClose={ () => setShowInformation(false) } />}
            { victor !== Symbols._ && <WinnerOverlay winner={ Symbols[victor].toString() } onClose={ resetGame } /> }            

            {/* TODO: find a way to make the dice appear on the same row as current player status  */}
            <div className="current_move">                                
                <b className="current_player">
                    <b className="current_player_symbol">
                        { Symbols[currentPlayer.symbol].toString() }
                    </b>
                    {/* 's Turn */}
                </b>
                <Dice result={ currentPlayer.totalDice } />
            </div>

            <Board boardState={ boardCells } onCellAction={(row, col) => onCellClick(row, col, currentPlayer)} />
        </div>
    );
}

export default Game;
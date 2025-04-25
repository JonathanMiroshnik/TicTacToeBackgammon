import { CellState } from "../Game/Game";
import Cell from "../Cell/Cell";

import './Board.css'

interface BoardProps {
    boardState: CellState[][];
    onCellAction: (row: number, col: number) => void;
}

function Board({ boardState, onCellAction } : BoardProps) {
    return (
        <>
            { boardState.map((cellRow, row) => (
                <div className="cell_row">
                    { cellRow.map((cell, col) => (
                        <Cell key={row.toString() + " " + col.toString()} cellState={cell} row={row} column={col} 
                        setCell={onCellAction} />
                    )) }
                </div>
            )) }            
        </>
    );
}

export default Board;
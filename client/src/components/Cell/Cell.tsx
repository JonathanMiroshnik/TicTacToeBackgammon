import { CellState, Symbols } from "../Game/Game";
import CellCounter from "../CellCounter/CellCounter";
import "./Cell.css"

interface CellProps {
    cellState: CellState;
    row: number;
    column: number;
    setCell: (r: number, c: number) => void;
}

function Cell({ cellState, row, column, setCell } : CellProps) {
    return (
        <button className="cell" onClick={() => setCell(row, column)}> 
            { cellState.symbol !== Symbols._ ? Symbols[cellState.symbol].toString() + " " + cellState.totalDice : null }                 
            {/* { cellState.symbol !== Symbols._ ? <CellCounter score={cellState.totalDice} total={6} /> : null } */}
        </button>
    );
}

export default Cell;
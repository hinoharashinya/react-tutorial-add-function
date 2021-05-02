import {boardProps} from "../types/boardType";
import {VFC} from "react";
import {Square} from "./Square";

export const Board: VFC<boardProps> = (props) => {
  const {squares, onClick} = props;
  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i}
      />
    );
  }
  const cols = [0,3,6,9];
  const rows = [0,1,2];

  return (
    <div>
      {rows.map(row =>
        <div className="board-row" key={row}>
          {squares.slice(cols[row], cols[row + 1]).map( (square, index) => renderSquare(index + cols[row]))}
        </div>
      )}
    </div>
  );

}

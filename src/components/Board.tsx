import {boardProps} from "../types/boardType";
import {VFC} from "react";
import {Square} from "./Square";

export const Board: VFC<boardProps> = (props) => {
  const {squares, onClick, winRow} = props;

  const winnersStyle = {backgroundColor: "yellow"}
  const renderSquare = (i: number) => {
    if(winRow.some(value => value === i)){
      return (
          <Square
          value={squares[i]}
          onClick={() => onClick(i)}
          key={i}
          style={winnersStyle}
        />
      );
    }else{
      return (
        <Square
          value={squares[i]}
          onClick={() => onClick(i)}
          key={i}
        />
      );
    }

  }
  const cols = [0,3,6];
  const rows = [0,1,2];

  return (
    <div>
      {rows.map(row =>
        <div className="board-row" key={row}>
          {cols.map( (square, index) => renderSquare(index + cols[row]))}
        </div>
      )}
    </div>
  );

}

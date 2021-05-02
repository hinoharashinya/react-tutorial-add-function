import {squareProps} from "../types/squareType";
import {VFC} from "react";

export const Square: VFC<squareProps> = (props) => {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

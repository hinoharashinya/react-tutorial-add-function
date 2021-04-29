import {oneSquareType} from "./oneSquareType";

export type boardProps = {
  squares: Array<oneSquareType>;
  onClick: (i: number) => void;
}

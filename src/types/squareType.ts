import {oneSquareType} from "./oneSquareType";

export type squareProps = {
  value: oneSquareType;
  onClick: () => void;
  style?: {backgroundColor: string}
}

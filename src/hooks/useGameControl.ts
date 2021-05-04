import {useState} from "react";
import {historyType} from "../types/historyType";
import {calculateWinner} from "../utils/calculateWinner";

export const useGameControl = () => {
  const [history, setHistory] = useState<Array<historyType>>([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [colAndRows, setColAndRows] = useState<Array<Array<number>>>([]);
  const [reverseFlg, setReverseFlg] = useState(false);

  const handleClickSquare = (i: number) => {

    const copyedHistory = history.slice(0, stepNumber + 1);
    const current = history[copyedHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    let nextColAndRow:Array<number> = [];
    if(i === 0){
      nextColAndRow = [0,0];
    }else if(i === 1){
      nextColAndRow = [0,1];
    }else if(i === 2){
      nextColAndRow = [0,2];
    }else if(i === 3){
      nextColAndRow = [1,0];
    }else if(i === 4){
      nextColAndRow = [1,1];
    }else if(i === 5){
      nextColAndRow = [1,2];
    }else if(i === 6){
      nextColAndRow = [2,0];
    }else if(i === 7){
      nextColAndRow = [2,1];
    }else if(i === 8){
      nextColAndRow = [2,2];
    }
    let slicedColAndRows = colAndRows.slice(0, stepNumber);
    slicedColAndRows.push(nextColAndRow);
    setColAndRows(slicedColAndRows);

    squares[i] = xIsNext ? "X" : "O";
    setHistory(copyedHistory.concat([
      {
        squares: squares
      }
    ]));
    setStepNumber(copyedHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpToPast = (step: number) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const reverseHistoryInf = () => {
    setReverseFlg(!reverseFlg);
  }

  return {history, stepNumber, xIsNext, colAndRows, reverseFlg, handleClickSquare, jumpToPast, reverseHistoryInf};
}

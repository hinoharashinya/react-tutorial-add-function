import React, {VFC, useState} from 'react';
import {Board} from "./Board";
import {useGameControl} from "../hooks/useGameControl";
import {calculateWinner} from "../utils/calculateWinner";

export const Game: VFC = () =>  {

  const {history, stepNumber, xIsNext, colAndRows, handleClickSquare, jumpToPast} = useGameControl();

  const handleClick = (i: number) => handleClickSquare(i);

  const jumpTo = (step: number) => jumpToPast(step);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const boldStyles = {
    fontWeight: 700
  };

  const [reverseFlg, setReverseFlg] = useState(false);
  const reverseHistoryInf = () => {
    setReverseFlg(!reverseFlg);
  }

  const moves = history.map((step, move) => {
    const reverseArr = [];
    for(let i=history.length -1; i !== 0; i--){
      reverseArr.push(i);
    }
    console.log(reverseArr, move)
    let number = reverseFlg ? reverseArr[move] : move;

    const desc =  (reverseFlg === false && move) || (reverseFlg && move !== history.length -1) ?
      'Go to move #' + number + "(" + colAndRows[number - 1][0] + ", " + colAndRows[number - 1][1] + ")":
      'Go to game start';
    return (
      <li key={move}>
        {(reverseFlg && number === stepNumber) || (reverseFlg === false && move === stepNumber) ? <button style={boldStyles}>{desc}</button> :
        <button onClick={() => jumpTo(number)}>{desc}</button>
        }
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        <button onClick={reverseHistoryInf}>Reverse History Order</button>
      </div>
    </div>
  );
}

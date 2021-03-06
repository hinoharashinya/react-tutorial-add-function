import React, {VFC} from 'react';
import {Board} from "./Board";
import {useGameControl} from "../hooks/useGameControl";
import {calculateWinner} from "../utils/calculateWinner";

export const Game: VFC = () =>  {

  const {history, stepNumber, xIsNext, colAndRows, reverseFlg, handleClickSquare, jumpToPast, reverseHistoryInf} = useGameControl();

  const handleClick = (i: number) => handleClickSquare(i);

  const jumpTo = (step: number) => jumpToPast(step);

  const current = history[stepNumber];
  let winner = calculateWinner(current.squares);

  const boldStyles = {
    fontWeight: 700
  };

  const reverseArr: Array<number> = [];
  for(let i=history.length -1; i >= 0; i--){
    reverseArr.push(i);
  }

  const moves = history.map((step, move) => {

    let number = reverseFlg ? reverseArr[move] : move;

    const desc =  (reverseFlg === false && move) || (reverseFlg && move !== history.length -1) ?
      `Go to move #${number}(${colAndRows[number - 1][0]}, ${colAndRows[number - 1][1]})`:
      'Go to game start';
    return (
      <li key={move}>
        {number === stepNumber ? <button style={boldStyles}>{desc}</button> :
        <button onClick={() => jumpTo(number)}>{desc}</button>
        }
      </li>
    );
  });

  let status;
  if(winner === null){
    status = "Next player: " + (xIsNext ? "X" : "O");
    winner = [];
  } else if(winner[0] === 10){
    status = "Draw";
    winner = [];
  }else {
    status = "Winner: " + current.squares[winner[0]];
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
          winRow={winner}
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

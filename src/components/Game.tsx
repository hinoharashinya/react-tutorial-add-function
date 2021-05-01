import React, {VFC} from 'react';
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

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move + "(" + colAndRows[move - 1][0] + ", " + colAndRows[move - 1][1] + ")":
      'Go to game start';
    return (
      <li key={move}>
        {move === stepNumber ? <button onClick={() => jumpTo(move)} style={boldStyles}>{desc}</button> :
        <button onClick={() => jumpTo(move)}>{desc}</button>
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
      </div>
    </div>
  );
}

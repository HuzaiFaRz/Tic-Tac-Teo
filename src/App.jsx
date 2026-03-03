import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

function Circle({ value, circleClick, winnerGlowing }) {
  return (
    <div className={`${winnerGlowing}`} onClick={circleClick}>
      {value}
    </div>
  );
}

export default function App() {
  const [circles, setCircles] = useState(Array(9).fill(null));
  const [xNext, setXnext] = useState(true);
  const [isOver, setIsOver] = useState(false);
  let status;
  let winnerRow = [];

  function declareWinner(circles) {
    const winnerConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let index = 0; index < winnerConditions.length; index++) {
      const [a, b, c] = winnerConditions[index];
      if (
        circles[a] &&
        circles[a] === circles[b] &&
        circles[a] === circles[c]
      ) {
        winnerRow.push(a, b, c);
        return circles[a];
      }
    }
    return null;
  }

  const winner = declareWinner(circles);

  if (winner) {
    status = `${winner} Win`;
  } else {
    if (isOver) {
      status = "Game Over";
    } else {
      status = xNext ? "X Turn" : "O Turn";
    }
  }

  function circleClickHandler(index) {
    if (circles[index] || winner) {
      return;
    }
    const circlesHistory = circles.slice();

    if (xNext) {
      circlesHistory[index] = "X";
    } else {
      circlesHistory[index] = "O";
    }
    setCircles(circlesHistory);
    setXnext(!xNext);
    if (!winner && circlesHistory.every((e) => e !== null)) {
      setIsOver(true);
      return;
    }
  }

  const firstRow = [0, 1, 2];
  const secondRow = [3, 4, 5];
  const thirdRow = [6, 7, 8];

  function againStartHandler() {
    setIsOver(false);
    setCircles(Array(9).fill(null));
    setXnext(true);
  }

  let circleClass = "circle Animation";

  return (
    <Fragment>
      <main>
        <div className={`board ${!winner ? isOver && "Over" : null}`}>
          <div className="row">
            {firstRow.map((element, index) => {
              return (
                <Circle
                  key={index}
                  value={circles[element]}
                  circleClick={() => circleClickHandler([element])}
                  winnerGlowing={
                    winnerRow.includes(element) ? circleClass : "circle"
                  }
                />
              );
            })}
          </div>
          <div className="row">
            {secondRow.map((element, index) => {
              return (
                <Circle
                  key={index}
                  value={circles[element]}
                  circleClick={() => circleClickHandler([element])}
                  winnerGlowing={
                    winnerRow.includes(element) ? circleClass : "circle"
                  }
                />
              );
            })}
          </div>
          <div className="row">
            {thirdRow.map((element, index) => {
              return (
                <Circle
                  key={index}
                  value={circles[element]}
                  circleClick={() => circleClickHandler([element])}
                  winnerGlowing={
                    winnerRow.includes(element) ? circleClass : "circle"
                  }
                />
              );
            })}
          </div>
        </div>
        <p className="guide">
          <span>{status}</span>
          <button onClick={againStartHandler}>Again Start</button>
        </p>
      </main>
    </Fragment>
  );
}

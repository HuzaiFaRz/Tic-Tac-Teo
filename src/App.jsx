import { useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";

function Circle({ value, circleClick }) {
  return (
    <div className="circle" onClick={circleClick}>
      {value}
    </div>
  );
}

export default function App() {
  const [circles, setCircles] = useState(Array(9).fill(null));
  const [xNext, setXnext] = useState(false);
  const guideRef = useRef(null);

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
        return circles[a];
      }
    }
    return null;
  }

  const winner = declareWinner(circles);
  let status;
  if (winner) {
    status = `${winner} Win`;
  } else {
    status = !xNext ? "X Turn" : "O Turn";
  }

  function circleClickHandler(index) {
    if (circles[index] || winner) {
      guideRef.current.textContent = `${declareWinner(circles)} Win`;
      return;
    }
    const circlesHistory = circles.slice();
    if (!xNext) {
      circlesHistory[index] = "X";
    } else {
      circlesHistory[index] = "O";
    }
    setCircles(circlesHistory);
    setXnext(!xNext);
  }

  const firstRow = [0, 1, 2];
  const secondRow = [3, 4, 5];
  const thirdRow = [6, 7, 8];

  function againStartHandler() {
    setCircles(Array(9).fill(null));
  }

  return (
    <Fragment>
      <main>
        <div className="board">
          <div className="row">
            {firstRow.map((element, index) => {
              return (
                <Circle
                  key={index}
                  value={circles[element]}
                  circleClick={() => circleClickHandler([element])}
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
                />
              );
            })}
          </div>
        </div>
        <p className="guide" ref={guideRef}>
          {status}
          {winner && <button onClick={againStartHandler}>Again Start</button>}
        </p>
      </main>
    </Fragment>
  );
}

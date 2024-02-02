import "./App.css";
import { useState, useEffect } from "react";

const TictactoeBox = ({ value, handleBoxClick }) => {
  return (
    <div
      style={{ width: "30px", height: "30px", border: "1px solid black" }}
      onClick={handleBoxClick}
    >
      {value}
    </div>
  );
};
// {0, 1,2, 3, 4, 5, 6, 7, 8}
// {[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]}
export default function App() {
  const [valueXorO, setValueXorO] = useState("O");
  const [ticTacToeArray, setTicTacToeArray] = useState(Array(9).fill(""));
  const [winnerData, setWinnerData] = useState("");

  useEffect(() => {
    // console.log(' tic', ticTacToeArray);
    const winner = checkWinner();
    if (winner) {
      setWinnerData(valueXorO === "X" ? "O" : "X");
    }
    console.log(" winner ", winner);
  }, [valueXorO, ticTacToeArray]);

  const handleXandOs = (index) => {
    if (ticTacToeArray[index] || checkWinner()) {
      return;
    }
    setTicTacToeArray((prev) => {
      const newarr = prev.map((item, i) => {
        if (index == i) {
          return valueXorO;
        }
        return item;
      });
      return newarr;
    });
    if (valueXorO === "O") {
      setValueXorO("X");
    } else {
      setValueXorO("O");
    }
  };

  const hanldeReset = () => {
    setTicTacToeArray(Array(9).fill(""));
    setWinnerData("");
  };

  const checkWinner = () => {
    const winnerArray = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (var i = 0; i < winnerArray.length; i++) {
      if (
        ticTacToeArray[winnerArray[i][0]] !== "" &&
        ticTacToeArray[winnerArray[i][0]] ===
          ticTacToeArray[winnerArray[i][1]] &&
        ticTacToeArray[winnerArray[i][2]] === ticTacToeArray[winnerArray[i][0]]
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div className="App">
        {ticTacToeArray.map((item, index) => {
          return (
            <TictactoeBox
              value={ticTacToeArray[index]}
              handleBoxClick={() => handleXandOs(index)}
            />
          );
        })}
      </div>
      {winnerData != "" && <h1>winner : {winnerData}</h1>}
      {winnerData != "" && <button onClick={hanldeReset}>Replay</button>}
    </>
  );
}

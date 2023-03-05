import Container from "./components/Container";
import Wrapper from "./components/Wrapper";
import Box from "./components/Box";
import Button from "./components/Button";
import Display from "./components/Display";
import { useState } from "react";

const App = () => {
  const [displayText, setDisplayText] = useState("Hey! let's play");
  const [matrix, setMatrix] = useState([]);
  const [winnerCombination, setWinnerCombination] = useState([]);
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(1);
  const [wClass, setWClass] = useState("");
  const combinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const startGame = () => {
    setMatrix([]);
    setTurn(1);
    setWinnerCombination([]);
    setWClass("");
    setDisplayText("The game has started");
    setStart(true);
  };

  const boxClick = (event, key) => {
    if (turn % 2 === 0) {
      matrix[key] = "X";
    } else {
      matrix[key] = "O";
    }

    setMatrix(matrix);
    setTurn(turn + 1);

    if (turn > 2) {
      checkWinner("X");
      checkWinner("O");
    }

    if (turn === 9) {
      setDisplayText("It's a draw!");
    }
  };

  const resetGame = () => {
    setMatrix([]);
    setTurn(1);
    setWinnerCombination([]);
    setWClass("");
    setStart(false);
    setDisplayText("Hey! let's play");
  };

  const checkWinner = (el) => {
    let hasWinner = false;
    let count = 0;
    let tmpComb = [];
    for (let i = 0; i < combinations.length; i++) {
      count = 0;
      tmpComb = [];
      for (let j = 0; j < combinations[i].length; j++) {
        if (matrix[combinations[i][j]] === el) {
          tmpComb.push(combinations[i][j]);
          count++;
        }
      }
      if (count === 3) {
        hasWinner = true;
        setWinnerCombination(tmpComb);
        if (i >= 0 && i <= 2) {
          setWClass("sLineH");
        } else if (i >= 3 && i <= 5) {
          setWClass("sLineV");
        } else if (i === 6) {
          setWClass("dLineLeft");
        } else {
          setWClass("dLineRight");
        }
        break;
      }
    }
    if (hasWinner) {
      setStart(false);
      setDisplayText("The winner is: " + el);
    }
  };

  const showBoxes = () => {
    let content = [];
    for (let i = 1; i <= 9; i++) {
      const checkIndex = matrix?.[i];
      if (checkIndex === undefined) {
        content.push(
          <Box
            key={i}
            onClick={(event) => boxClick(event, i)}
            disabled={!start}
          />
        );
      } else {
        content.push(
          <Box
            key={i}
            onClick={(event) => boxClick(event, i)}
            disabled={true}
            name={matrix[i]}
            class={winnerCombination.includes(i) ? wClass : ""}
          />
        );
      }
    }
    return content;
  };

  return (
    <>
      <Container class="main-container">
        <Wrapper>{showBoxes()}</Wrapper>
      </Container>
      <Container class="bottom-container">
        <Display>{displayText}</Display>
      </Container>
      <Container class="bottom-container">
        {!start && <Button name="Start Game" onClick={startGame} />}
      </Container>
      <Container class="bottom-container">
        {start && <Button name="Reset Game" onClick={resetGame} />}
      </Container>
    </>
  );
};

export default App;

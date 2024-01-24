import { useEffect } from "react";
import Row from "./GameRow";
import useGame from "../hooks/useGame.js";

export default function GameBoard() {
  const { board, score, gameOver, dispatch } = useGame();

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case "R":
      case "r":
        dispatch({ type: "RESET" });
        return;
      case "ArrowRight":
        dispatch({ type: "MOVE", dir: "RIGHT" });
        break;

      case "ArrowLeft":
        dispatch({ type: "MOVE", dir: "LEFT" });
        break;

      case "ArrowUp":
        dispatch({ type: "MOVE", dir: "UP" });
        break;

      case "ArrowDown":
        dispatch({ type: "MOVE", dir: "DOWN" });
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <h3>Score: {score}</h3>
      <div id="game-container">
        {board.map((gameRow, index) => (
          <Row key={index} row={gameRow} rowIndex={index} />
        ))}
      </div>
      {gameOver && <h3>Game Over! Press R to Restart</h3>}
    </>
  );
}

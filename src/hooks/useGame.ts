import { useReducer } from "react";
import {
  addRandomBlockToBoard,
  initialGameState,
  canMoveDown,
  canMoveLeft,
  canMoveRight,
  canMoveUp,
  isGameOver,
} from "../lib/util";
import { moveLeft, moveRight, moveUp, moveDown } from "../lib/moves";
import { GameState } from "../types/index";

const MOVE = {
  LEFT: moveLeft,
  RIGHT: moveRight,
  UP: moveUp,
  DOWN: moveDown,
};

const CAN_MOVE = {
  LEFT: canMoveLeft,
  RIGHT: canMoveRight,
  UP: canMoveUp,
  DOWN: canMoveDown,
};

function gameReducer(
  state: GameState,
  action: { type: string; dir?: "LEFT" | "RIGHT" | "UP" | "DOWN" }
): GameState {
  switch (action.type) {
    case "MOVE":
      if (!action.dir || !CAN_MOVE[action.dir](state.board)) return state;
      let [_, stateAfterMove, scoreGained] = MOVE[action.dir](state.board);
      const updatedGameState = addRandomBlockToBoard(stateAfterMove, [2, 4]);
      return {
        score: state.score + scoreGained,
        board: updatedGameState,
        gameOver: isGameOver(updatedGameState),
      };
    case "RESET":
      return {
        score: 0,
        board: addRandomBlockToBoard(initialGameState, [2, 4]),
        gameOver: false,
      };
    default:
      return state;
  }
}

export default function useGame() {
  const [{ board, score, gameOver }, dispatch] = useReducer(
    gameReducer,
    {
      score: 0,
      board: structuredClone(initialGameState),
      gameOver: false,
    },
    (initialState) => {
      return {
        score: 0,
        board: addRandomBlockToBoard(initialState.board, [2, 4]),
        gameOver: false,
      };
    }
  );
  return { board, score, gameOver, dispatch };
}

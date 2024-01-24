import { Board, TwoDimUpdate } from "../types";
import { initialGameState } from "./util";

export function rightRotateState(state: Board): Board {
  let rotatedState = structuredClone(initialGameState);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      rotatedState[row][col] = state[3 - col][row];
    }
  }
  return rotatedState;
}

export function leftRotateState(state: Board): Board {
  let rotatedState = structuredClone(initialGameState);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      rotatedState[row][col] = state[col][3 - row];
    }
  }
  return rotatedState;
}

export function rightRotateUpdates(updates: TwoDimUpdate[]): TwoDimUpdate[] {
  return updates.map((update) => {
    return {
      from: {
        x: update.from.y,
        y: 3 - update.from.x,
      },
      to: {
        x: update.to.y,
        y: 3 - update.to.x,
        value: update.to.value,
      },
    };
  });
}

export function leftRotateUpdates(updates: TwoDimUpdate[]): TwoDimUpdate[] {
  return updates.map((update) => {
    return {
      from: {
        x: 3 - update.from.y,
        y: update.from.x,
      },
      to: {
        x: 3 - update.to.y,
        y: update.to.x,
        value: update.to.value,
      },
    };
  });
}

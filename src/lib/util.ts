import { Board, Tile } from "../types";

function pickRandomElement<T>(arr: T[]): T {
  const randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
}

function canMergeCells(state: Board): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (!state[i][j]) continue;
      if (j + 1 < 4 && state[i][j + 1] === state[i][j]) return true;
      if (i + 1 < 4 && state[i + 1][j] === state[i][j]) return true;
    }
  }
  return false;
}

export function canMoveLeft(state: Board): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (!state[i][j]) continue;
      const cellOnLeft = state[i][j - 1];
      if (cellOnLeft == state[i][j] || cellOnLeft == 0) return true;
    }
  }
  return false;
}

export function canMoveRight(state: Board): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (!state[i][j]) continue;
      const cellOnRight = state[i][j + 1];
      if (cellOnRight == state[i][j] || cellOnRight == 0) return true;
    }
  }
  return false;
}

export function canMoveUp(state: Board): boolean {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (!state[i][j]) continue;
      const cellAbove = state[i - 1][j];
      if (cellAbove == state[i][j] || cellAbove == 0) return true;
    }
  }
  return false;
}

export function canMoveDown(state: Board): boolean {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      const cellBelow = state[i + 1][j];
      if (cellBelow == state[i][j] || cellBelow == 0) return true;
    }
  }
  return false;
}

export function isGameOver(state: Board): boolean {
  //Game is over if there are no open positions and no possible moves
  const hasOpenPositions = getAllFreePositions(state).length > 0;
  return !hasOpenPositions && !canMergeCells(state);
}

export function getAllFreePositions(state: Board): [number, number][] {
  let freePositions: [number, number][] = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (state[i][j] == 0) freePositions.push([i, j]);
    }
  }
  return freePositions;
}

export function generateRandomBlock(
  state: Board,
  allowedValues: number[]
): Tile {
  const [posX, posY] = pickRandomElement(getAllFreePositions(state));
  const blockValue = pickRandomElement(allowedValues);
  return {
    blockValue,
    posX,
    posY,
  };
}

export function addRandomBlockToBoard(
  state: Board,
  allowedValues: number[]
): Board {
  const { blockValue, posX, posY } = generateRandomBlock(state, allowedValues);
  let newState = structuredClone(state);
  newState[posX][posY] = blockValue;
  return newState;
}

export const initialGameState: Board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

import {
  leftRotateState,
  leftRotateUpdates,
  rightRotateState,
} from "./rotations";
import { Board, MoveInfo, OneDimUpdate, Row, TwoDimUpdate } from "../types";
import { initialGameState } from "./util";

export function compressRow(
  row: Row<number, 4>,
  dir: "right" | "left"
): [OneDimUpdate[], Row<number, 4>, number] {
  /*
      Accepts a one dimensional array and a direction to merge in.
      Merges cell using a stack and returns an array of position updates,
      a final updated array and total score gained.
    */
  let stack: number[] = [];
  let blockUpdates: OneDimUpdate[] = [];
  let scoreGained = 0;
  const rowCopy = row.slice();
  if (dir === "right") rowCopy.reverse();
  rowCopy.forEach((tile, originalIndex) => {
    if (tile == 0) return;
    if (stack.at(-1) === tile) {
      stack.pop();
      stack.push(2 * tile);
      scoreGained += 2 * tile;
    } else {
      stack.push(tile);
    }
    blockUpdates.push({
      from: dir === "right" ? 3 - originalIndex : originalIndex,
      to: dir === "right" ? 4 - stack.length : stack.length - 1,
      value: stack.at(-1) ?? 0,
    });
  });
  let finalRow: Row<number, 4> = [0, 0, 0, 0];
  for (let i = 0; i < stack.length; i++) finalRow[i] = stack[i];
  if (dir === "right") finalRow.reverse();
  return [blockUpdates, finalRow, scoreGained];
}

export function compressMatrix(state: Board, dir: "right" | "left"): MoveInfo {
  /*
      Accepts a two dimensional array and a direction to merge in.
      Merges all rows using compressRow and aggregates the final results.
    */
  const updatedState: Board = structuredClone(initialGameState);
  let totalScoreGained = 0;
  const positionUpdates: TwoDimUpdate[] = state
    .map((row, rowIndex) => {
      const [blockUpdates, updatedRow, scoreGainedFromRow] = compressRow(
        row,
        dir
      );
      updatedState[rowIndex] = updatedRow;
      totalScoreGained += scoreGainedFromRow;
      return blockUpdates.map((update) => {
        return {
          from: {
            x: rowIndex,
            y: update.from,
          },
          to: {
            x: rowIndex,
            y: update.to,
            value: update.value,
          },
        };
      });
    })
    .flat();
  return [positionUpdates, updatedState, totalScoreGained];
}

export function moveRight(state: Board): MoveInfo {
  return compressMatrix(state, "right");
}

export function moveLeft(state: Board): MoveInfo {
  return compressMatrix(state, "left");
}

export function moveUp(state: Board): MoveInfo {
  const rightRotatedState = rightRotateState(state);
  const [
    rightRotatedPositionUpdates,
    updatedRightRotatedState,
    totalScoreGained,
  ] = compressMatrix(rightRotatedState, "right");
  const updatedState = leftRotateState(updatedRightRotatedState);
  const positionUpdates = leftRotateUpdates(rightRotatedPositionUpdates);
  return [positionUpdates, updatedState, totalScoreGained];
}

export function moveDown(state: Board): MoveInfo {
  const rightRotatedState = rightRotateState(state);
  const [
    rightRotatedPositionUpdates,
    updatedRightRotatedState,
    totalScoreGained,
  ] = compressMatrix(rightRotatedState, "left");
  const updatedState = leftRotateState(updatedRightRotatedState);
  const positionUpdates = leftRotateUpdates(rightRotatedPositionUpdates);
  return [positionUpdates, updatedState, totalScoreGained];
}

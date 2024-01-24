type Tile = { blockValue: number; posX: number; posY: number };

type Row<T, N extends number, A extends any[] = []> = A extends { length: N }
  ? A
  : Row<T, N, [...A, T]>;

type Board = Row<Row<number, 4>, 4>;

type GameState = {
  score: number;
  board: Board;
  gameOver: boolean;
};

type OneDimUpdate = { from: number; to: number; value: number };

type TwoDimUpdate = {
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
    value: number;
  };
};

type MoveInfo = [TwoDimUpdate[], Board, number];

export type {
  Tile,
  Row,
  Board,
  GameState,
  OneDimUpdate,
  TwoDimUpdate,
  MoveInfo,
};

import { tBoard, States } from "../interface/model";

export const addMine = (n: number) => n | States.Mine;
export const toggleFlag = (n: number) => n ^ States.Flag;
export const uncover = (n: number) => n & ~States.Hidden;
export const hasMine = (n: number) => (n & States.Mine) === States.Mine;
export const hasFlag = (n: number) => (n & States.Flag) === States.Flag;
export const isHidden = (n: number) => (n & States.Hidden) === States.Hidden;

export const clearLast4Bits = (n: number) => (n >> 4) << 4;

export const getMines = (n: number) =>
  (n & 1) + ((n >> 1) & 1) * 2 + ((n >> 2) & 1) * 4 + ((n >> 3) & 1) * 8;

export const incrementNoOfCloseingMines = (n: number) =>
  clearLast4Bits(n) | (getMines(n) + 1);

interface StrippedMines {
  CloseingMines: number;
  hasMine: boolean;
  hasFlag: boolean;
  isHidden: boolean;
}
export const stripMines = (n: number): StrippedMines => ({
  CloseingMines: getMines(n),
  hasMine: hasMine(n),
  hasFlag: hasFlag(n),
  isHidden: isHidden(n)
});

export const getBlankBoardData = (
  w: number,
  h: number,
  initialState = States.Hidden
): tBoard =>
  new Array(h).fill(null).map(() => new Uint8Array(w).fill(initialState));

export const generateMinesPositions = (
  w: number,
  h: number,
  Mines: number
): Set<number> => {
  const set = new Set<number>();
  const maxFields = w * h;

  while (set.size < Mines) {
    set.add(Math.floor(Math.random() * maxFields));
  }

  return set;
};

export interface Coords {
  row: number;
  col: number;
}

const getCoords = (n: number, width: number): Coords => ({
  row: (n / width) | 0,
  col: n % width
});
export const applyMines = (
  width: number,
  board: tBoard,
  minePositions: Set<number>
) => {
  Array.from(minePositions).forEach((n) => {
    const { row, col } = getCoords(n, width);
    board[row][col] = addMine(board[row][col]);
  });

  return board;
};

export const getCloseCoords = (
  row: number,
  col: number,
  w: number,
  h: number
): Coords[] => {
  // prettier-ignore
  const potentials = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row    , col - 1],                 [row    , col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
  ];

  return potentials
    .filter(([_row, _col]) => _row >= 0 && _col >= 0 && _row < h && _col < w)
    .map(([row, col]) => ({ row, col }));
};

export const calculateMineCloses = (
  width: number,
  height: number,
  board: tBoard,
  minePositions: Set<number>
) => {
  Array.from(minePositions).forEach((n) => {
    // coords of a mine
    const { row, col } = getCoords(n, width);
    getCloseCoords(row, col, width, height).forEach(({ row, col }) => {
      board[row][col] = incrementNoOfCloseingMines(board[row][col]);
    });
  });
  return board;
};

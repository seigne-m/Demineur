import React, { useCallback, useContext, useEffect, useState } from "react";

import Box from "./Box";
import { GameStart } from "./Map";
import { tBoard } from "../../interface/model";
import { Border, Score } from "../../style/StyledCompoents";
import {
  getBlankBoardData,
  getCloseCoords,
  generateMinesPositions,
  calculateMineCloses,
  applyMines,
  uncover,
  isHidden,
  hasMine,
  getMines,
  Coords
} from "../../utils/utils";

interface Props {
  width: number;
  height: number;
  mines: number;
  onWin(): void;
  onLose(): void;
}

const getCoordsFromEvt = (evt: MouseEvent) => {
  const target = evt.target as HTMLElement;
  if (target.classList.contains("cell")) {
    let { row: _row, col: _col } = (evt.target as HTMLElement).dataset;
    const row = +_row!;
    const col = +_col!;
    return { row, col };
  }
};

export default ({ width: w, height: h, mines, onLose, onWin }: Props) => {
  const [boardState, setBoardState] = useState<tBoard>([new Uint16Array(1)]);
  const [ScoreCount, setScoreCount] = useState(0);
  const isGameStart = useContext(GameStart);

  useEffect(() => {
    const minePositions = generateMinesPositions(w, h, mines);
    const blank = getBlankBoardData(w, h);

    setBoardState(
      applyMines(
        w,
        calculateMineCloses(w, h, blank, minePositions),
        minePositions
      )
    );
  }, []);

  useEffect(() => {
    if (
      boardState.length > 1 &&
      boardState.every((row) => row.every((val) => !isHidden(val)))
    ) {
      onWin();
    }
  }, [boardState, onWin, mines]);

  const propagateZeros = useCallback(
    (row: number, col: number, w: number, h: number) => {
      const visited = new Set();
      const stack: Coords[] = [{ row, col }];
      while (stack.length > 0) {
        const { row, col } = stack.pop()!;
        const key = `${row}-${col}`;
        if (!visited.has(key)) {
          visited.add(key);
          getCloseCoords(row, col, w, h)
            .filter(({ row, col }) => {
              const itm = boardState[row][col];
              return !hasMine(itm) && isHidden(itm);
            })
            .forEach(({ row, col }) => {
              const itm = boardState[row][col];
              boardState[row][col] = uncover(itm);
              if (getMines(itm) === 0) {
                stack.push({ row, col });
              }
            });
        }
      }
    },
    [boardState]
  );

  const revealHiddenSquares = useCallback(
    (row: number, col: number) => {
      const itm = boardState[row][col];
      boardState[row][col] = uncover(itm);
      if (getMines(itm) === 0) {
        propagateZeros(row, col, w, h);
      }
      if (hasMine(itm)) {
        onLose();
      }
    },
    [boardState, h, w, propagateZeros, onLose]
  );

  const onLeftClick = useCallback(
    (row: number, col: number) => {
      const itm = boardState[row][col];

      if (isHidden(itm)) {
        setScoreCount(ScoreCount + 1);
        revealHiddenSquares(row, col);
      }
      return boardState;
    },
    [boardState]
  );

  const onLeftClickWrapper = useCallback(
    (evt: MouseEvent) => {
      const coords = getCoordsFromEvt(evt);
      if (coords) {
        const { row, col } = coords;
        const newBoardState = onLeftClick(row, col);
        setBoardState([...newBoardState]);
      }
    },
    [onLeftClick]
  );

  return (
    // @ts-ignore
    <Border w={w} h={h} onClick={onLeftClickWrapper} isGameStart={isGameStart}>
      {boardState.map((row, rowIdx) =>
        Array.prototype.map.call(row, (value, colIdx) => (
          <Box
            key={`${rowIdx}-${colIdx}`}
            rowId={rowIdx}
            colId={colIdx}
            value={value}
          />
        ))
      )}
      <Score>Score : {2}</Score>
    </Border>
  );
};

import React, { useContext } from "react";

import { StyledBox } from "../../style/StyledCompoents";
import { stripMines } from "../../utils/utils";
import { GameStart } from "./Map";

interface Props {
  rowId: number;
  colId: number;
  value: number;
}
const Box = ({ rowId, colId, value }: Props) => {
  const { CloseingMines, hasMine, isHidden } = stripMines(value);
  const isGameStart = useContext(GameStart);
  return (
    <StyledBox
      key={`${rowId}-${colId}`}
      data-row={rowId}
      data-col={colId}
      value={value}
      className="cell"
    >
      {isGameStart
        ? isHidden
          ? undefined
          : CloseingMines || " "
        : !isHidden && hasMine
        ? "X"
        : hasMine
        ? "X"
        : isHidden
        ? undefined
        : CloseingMines || " "}
    </StyledBox>
  );
};

export default Box;

import styled from "styled-components";
import { isHidden, getMines } from "../utils/utils";
import { BorderProps } from "../interface/model";

export const Border = styled.section<BorderProps>`
  touch-action: none;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.h},
    minmax(
      min(
        ${(props) => Math.floor(100 / props.h) - 1}vh,
        ${(props) => Math.floor(100 / props.h) - 1}vw
      ),
      1fr
    )
  );
  grid-template-columns: repeat(
    ${(props) => props.w},
    minmax(
      min(
        ${(props) => Math.floor(100 / props.w) - 1}vh,
        ${(props) => Math.floor(100 / props.w) - 1}vw
      ),
      1fr
    )
  );
  grid-gap: 1px;

  ${(props) => (props.isGameStart ? "" : "pointer-events: none;")}
`;

export const StyledBox = styled.div<{ value: number }>`
  border-radius: 4px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: background-color 0.3s;
  color: ${(props) => (getMines(props.value) === 0 ? "#222" : "#999")};
  background-color: ${(props) => (isHidden(props.value) ? "#111" : "")};
  &:hover {
    background-color: #333;
  }
`;

export const GameWrapper = styled.main<{ w: number; h: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(min(100vh, 100vw));
  height: calc(min(100vh, 100vw));
  font-size: min(
    ${({ w, h }) =>
      new Array(2)
        .fill(Math.min(4, Math.floor(100 / Math.max(w, h)) - 1.5))
        .join("vh, ") + "vw"}
  );

  margin: 0 auto;
`;

export const GameOverDiv = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Score = styled.div`
  position: absolute;
  top: 1vh;
  color: black;
  font-size: min(2.5vh, 2.5vw);
`;

import * as React from "react";
import { GameOverProps } from "../../interface/model";
import { GameOverDiv } from "../../style/StyledCompoents";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const GameOver = ({ survived, onClick }: GameOverProps) => (
  <GameOverDiv onClick={onClick}>
    {survived ? (
      <Alert severity="success">
        <AlertTitle>GAME WIN !!</AlertTitle>
        <strong>Click to restart!</strong>
      </Alert>
    ) : (
      <Alert severity="error">
        <AlertTitle>GAME OVER !</AlertTitle>
        <strong>Click to restart!</strong>
      </Alert>
    )}
  </GameOverDiv>
);

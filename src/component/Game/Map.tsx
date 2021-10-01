import { createContext, useState } from "react";

import Game from "./Game";
import { GameWrapper } from "../../style/StyledCompoents";
import { GameOver } from "./GameOver";

export const GameStart = createContext<boolean | undefined>(true);

const Map = () => {
  const [width] = useState(10);
  const [height] = useState(10);
  const [mines] = useState(10);
  const [i, setCounter] = useState(0);
  const [life, setlife] = useState<boolean>();

  const gameStart = life === undefined;

  return (
    <GameStart.Provider value={gameStart}>
      <GameWrapper w={width} h={height}>
        <Game
          key={i}
          width={width}
          height={height}
          mines={mines}
          onWin={() => setlife(true)}
          onLose={() => setlife(false)}
        />
        {!gameStart && (
          <GameOver
            life={life!}
            onClick={() => {
              setlife(undefined);
              setCounter(i + 1);
            }}
          />
        )}
      </GameWrapper>
    </GameStart.Provider>
  );
};

export default Map;

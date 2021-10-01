export interface Dim {
  w: number;
  h: number;
  mines: number;
}

export interface BorderProps {
  w: number;
  h: number;
  onClick(evt: MouseEvent): void;
  isGameStart: boolean;
}

export interface GameOverProps {
  survived: boolean;
  onClick(): void;
}

export type tBoard = Uint8Array[];

export enum States {
  Hidden = 1 << 5,
  Mine = 1 << 6
}
export type State = keyof typeof States;

export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface Position {
  x: number;
  y: number;
  facing: Direction;
}

export interface RobotState {
  position: Position | null;
  isPlaced: boolean;
}

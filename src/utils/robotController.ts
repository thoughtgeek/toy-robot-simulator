import { Direction, Position, RobotState } from "../types/robot";

const DIRECTIONS: Direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];

export const createInitialState = (): RobotState => ({
  position: null,
  isPlaced: false,
});

export const isValidPosition = (x: number, y: number): boolean => {
  return x >= 0 && x <= 4 && y >= 0 && y <= 4;
};

export const rotateLeft = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 3) % 4];
};

export const rotateRight = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 1) % 4];
};

export const move = (position: Position): Position | null => {
  let { x, y, facing } = position;

  switch (facing) {
    case "NORTH":
      y += 1;
      break;
    case "SOUTH":
      y -= 1;
      break;
    case "EAST":
      x += 1;
      break;
    case "WEST":
      x -= 1;
      break;
  }

  return isValidPosition(x, y) ? { x, y, facing } : null;
};

export const processCommand = (state: RobotState, command: string): RobotState => {
  const [action, params] = command.trim().split(" ");

  if (action === "PLACE" && params) {
    const [x, y, facing] = params.split(",");
    const newX = parseInt(x, 10);
    const newY = parseInt(y, 10);

    if (
      isValidPosition(newX, newY) &&
      DIRECTIONS.includes(facing as Direction)
    ) {
      return {
        position: {
          x: newX,
          y: newY,
          facing: facing as Direction,
        },
        isPlaced: true,
      };
    }
    return state;
  }

  if (!state.isPlaced || !state.position) {
    return state;
  }

  switch (action) {
    case "MOVE": {
      const newPosition = move(state.position);
      return newPosition
        ? { ...state, position: newPosition }
        : state;
    }
    case "LEFT":
      return {
        ...state,
        position: {
          ...state.position,
          facing: rotateLeft(state.position.facing),
        },
      };
    case "RIGHT":
      return {
        ...state,
        position: {
          ...state.position,
          facing: rotateRight(state.position.facing),
        },
      };
    default:
      return state;
  }
};

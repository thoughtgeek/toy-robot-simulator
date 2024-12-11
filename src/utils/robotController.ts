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

interface CommandResult {
  newState: RobotState;
  warning?: string;
}

export const processCommand = (state: RobotState, command: string): CommandResult => {
  const [action, params] = command.trim().split(" ");

  // Handle invalid or empty commands
  if (!action) {
    return {
      newState: state,
      warning: "Please enter a valid command"
    };
  }

  // Handle PLACE command
  if (action === "PLACE" && params) {
    const [x, y, facing] = params.split(",");
    const newX = parseInt(x, 10);
    const newY = parseInt(y, 10);

    if (isNaN(newX) || isNaN(newY)) {
      return {
        newState: state,
        warning: "Invalid coordinates! Please use numbers for X and Y positions"
      };
    }

    if (!isValidPosition(newX, newY)) {
      return {
        newState: state,
        warning: "Cannot place robot outside the table boundaries!"
      };
    }

    if (!DIRECTIONS.includes(facing as Direction)) {
      return {
        newState: state,
        warning: "Invalid direction! Use NORTH, SOUTH, EAST, or WEST"
      };
    }

    return {
      newState: {
        position: {
          x: newX,
          y: newY,
          facing: facing as Direction,
        },
        isPlaced: true,
      }
    };
  }

  // Handle commands before robot is placed
  if (!state.isPlaced || !state.position) {
    return {
      newState: state,
      warning: "Please place the robot on the table first using the PLACE command"
    };
  }

  switch (action) {
    case "MOVE": {
      const potentialPosition = move(state.position);
      if (!potentialPosition) {
        return {
          newState: state,
          warning: "Cannot move robot outside the table boundaries!"
        };
      }
      return { newState: { ...state, position: potentialPosition } };
    }
    case "LEFT":
    case "RIGHT":
      return {
        newState: {
          ...state,
          position: {
            ...state.position,
            facing: action === "LEFT" ? rotateLeft(state.position.facing) : rotateRight(state.position.facing),
          },
        }
      };
    case "REPORT":
      return { newState: state };
    default:
      return {
        newState: state,
        warning: `Unknown command: ${action}. Use PLACE, MOVE, LEFT, RIGHT, or REPORT`
      };
  }
};

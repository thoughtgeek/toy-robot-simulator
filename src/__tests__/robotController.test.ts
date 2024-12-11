import { describe, test, expect, beforeEach } from "vitest";
import { createInitialState, processCommand } from "../utils/robotController";
import type { RobotState } from "../types/robot";

describe("Robot Controller", () => {
  let state: RobotState;

  beforeEach(() => {
    state = createInitialState();
  });

  test("Example a) PLACE 0,0,NORTH MOVE REPORT", () => {
    state = processCommand(state, "PLACE 0,0,NORTH").newState;
    state = processCommand(state, "MOVE").newState;
    
    expect(state.position).toEqual({
      x: 0,
      y: 1,
      facing: "NORTH"
    });
  });

  test("Example b) PLACE 0,0,NORTH LEFT REPORT", () => {
    state = processCommand(state, "PLACE 0,0,NORTH").newState;
    state = processCommand(state, "LEFT").newState;
    
    expect(state.position).toEqual({
      x: 0,
      y: 0,
      facing: "WEST"
    });
  });

  test("Example c) PLACE 1,2,EAST MOVE MOVE LEFT MOVE REPORT", () => {
    state = processCommand(state, "PLACE 1,2,EAST").newState;
    state = processCommand(state, "MOVE").newState;
    state = processCommand(state, "MOVE").newState;
    state = processCommand(state, "LEFT").newState;
    state = processCommand(state, "MOVE").newState;
    
    expect(state.position).toEqual({
      x: 3,
      y: 3,
      facing: "NORTH"
    });
  });

  test("Invalid PLACE command with out of bounds coordinates", () => {
    const result = processCommand(state, "PLACE 5,5,NORTH");
    expect(result.warning).toBe("Cannot place robot outside the table boundaries!");
    expect(result.newState.isPlaced).toBe(false);
  });

  test("Invalid PLACE command with invalid direction", () => {
    const result = processCommand(state, "PLACE 0,0,NORTHWEST");
    expect(result.warning).toBe("Invalid direction! Use NORTH, SOUTH, EAST, or WEST");
    expect(result.newState.isPlaced).toBe(false);
  });

  test("Invalid PLACE command with non-numeric coordinates", () => {
    const result = processCommand(state, "PLACE a,b,NORTH");
    expect(result.warning).toBe("Invalid coordinates! Please use numbers for X and Y positions");
    expect(result.newState.isPlaced).toBe(false);
  });

  test("Commands before PLACE", () => {
    const result = processCommand(state, "MOVE");
    expect(result.warning).toBe("Please place the robot on the table first using the PLACE command");
  });

  test("Move causing fall from North edge", () => {
    state = processCommand(state, "PLACE 0,4,NORTH").newState;
    const result = processCommand(state, "MOVE");
    expect(result.warning).toBe("Cannot move robot outside the table boundaries!");
    expect(result.newState.position).toEqual({ x: 0, y: 4, facing: "NORTH" });
  });

  test("Unknown command", () => {
    state = processCommand(state, "PLACE 0,0,NORTH").newState;
    const result = processCommand(state, "JUMP");
    expect(result.warning).toBe("Unknown command: JUMP. Use PLACE, MOVE, LEFT, RIGHT, or REPORT");
  });

  test("Complex sequence with invalid moves", () => {
    state = processCommand(state, "PLACE 4,4,EAST").newState;
    const result1 = processCommand(state, "MOVE");
    expect(result1.warning).toBe("Cannot move robot outside the table boundaries!");
    
    state = processCommand(state, "RIGHT").newState;
    state = processCommand(state, "MOVE").newState;
    expect(state.position).toEqual({ x: 4, y: 3, facing: "SOUTH" });
  });
});

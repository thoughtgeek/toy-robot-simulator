import { describe, test, expect, beforeEach } from "vitest";
import { createInitialState, processCommand } from "../utils/robotController";
import type { RobotState } from "../types/robot";

describe("Robot Controller", () => {
  let state: RobotState;

  beforeEach(() => {
    state = createInitialState();
  });

  test("Example a) PLACE 0,0,NORTH MOVE REPORT", () => {
    state = processCommand(state, "PLACE 0,0,NORTH");
    state = processCommand(state, "MOVE");
    
    expect(state.position).toEqual({
      x: 0,
      y: 1,
      facing: "NORTH"
    });
  });

  test("Example b) PLACE 0,0,NORTH LEFT REPORT", () => {
    state = processCommand(state, "PLACE 0,0,NORTH");
    state = processCommand(state, "LEFT");
    
    expect(state.position).toEqual({
      x: 0,
      y: 0,
      facing: "WEST"
    });
  });

  test("Example c) PLACE 1,2,EAST MOVE MOVE LEFT MOVE REPORT", () => {
    state = processCommand(state, "PLACE 1,2,EAST");
    state = processCommand(state, "MOVE");
    state = processCommand(state, "MOVE");
    state = processCommand(state, "LEFT");
    state = processCommand(state, "MOVE");
    
    expect(state.position).toEqual({
      x: 3,
      y: 3,
      facing: "NORTH"
    });
  });
});

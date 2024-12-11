import React, { useState } from "react";
import { CommandInput } from "./CommandInput";
import { Table } from "./Table";
import { createInitialState, processCommand } from "../utils/robotController";
import { RobotState } from "../types/robot";

export const Simulator: React.FC = () => {
  const [state, setState] = useState<RobotState>(createInitialState());
  const [output, setOutput] = useState<string>("");

  const handleCommandsSubmit = (commands: string[]) => {
    // Start with current state instead of creating new state
    let currentState = state;
    const reports: string[] = [];

    commands.forEach((command) => {
      currentState = processCommand(currentState, command);

      if (command.trim() === "REPORT" && currentState.position) {
        const { x, y, facing } = currentState.position;
        reports.push(`${x},${y},${facing}`);
      }
    });

    setState(currentState);
    setOutput(reports.join("\n"));
  };

  // Add reset functionality
  const handleReset = () => {
    setState(createInitialState());
    setOutput("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Toy Robot Simulator
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <CommandInput onCommandsSubmit={handleCommandsSubmit} />
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={handleReset}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "0.375rem",
                marginBottom: "1rem"
              }}
            >
              Reset Robot
            </button>
          </div>
          <div style={{ marginTop: "1rem", color: "#666" }}>
            <div>Available commands:</div>
            <ul style={{ marginLeft: "1.5rem", listStyleType: "disc" }}>
              <li>PLACE X,Y,F (e.g., PLACE 0,0,NORTH)</li>
              <li>MOVE</li>
              <li>LEFT</li>
              <li>RIGHT</li>
              <li>REPORT</li>
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table robotPosition={state.position} />
        </div>

        {output && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Output:
            </h2>
            <pre style={{ 
              backgroundColor: "#f5f5f5", 
              padding: "1rem", 
              borderRadius: "0.375rem" 
            }}>
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

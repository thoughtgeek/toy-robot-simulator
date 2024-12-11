import React from "react";
import { Position } from "../types/robot";

interface TableProps {
  robotPosition: Position | null;
}

export const Table: React.FC<TableProps> = ({ robotPosition }) => {
  const cells = Array(5)
    .fill(null)
    .map((_, y) =>
      Array(5)
        .fill(null)
        .map((_, x) => ({
          x: x,
          y: 4 - y,
        }))
    );

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "4px",
      width: "400px",
      height: "400px",
      padding: "8px",
      backgroundColor: "#f0f0f0",
    }}>
      {cells.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${cell.x},${cell.y}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              backgroundColor: 
                robotPosition &&
                robotPosition.x === cell.x &&
                robotPosition.y === cell.y
                  ? "#3b82f6"
                  : "white",
              aspectRatio: "1",
              width: "100%",
              height: "100%",
            }}
          >
            {robotPosition &&
              robotPosition.x === cell.x &&
              robotPosition.y === cell.y && (
                <div style={{
                  fontSize: "2rem",
                  color: "white",
                  fontWeight: "bold",
                }}>
                  {robotPosition.facing === "NORTH" && "↑"}
                  {robotPosition.facing === "SOUTH" && "↓"}
                  {robotPosition.facing === "EAST" && "→"}
                  {robotPosition.facing === "WEST" && "←"}
                </div>
              )}
          </div>
        ))
      )}
    </div>
  );
};

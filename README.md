# Toy Robot Simulator

A React-based simulator that allows you to control a robot on a 5x5 table surface using simple commands.

## Features

- Visual 5x5 grid representation
- Real-time robot movement and rotation
- Command validation and warning messages
- Position reporting

## Getting Started

```bash
npm install
npm run dev
```

## Available Commands
- `PLACE X,Y,F`: Place the robot on the table at position X,Y and facing direction F.
- `MOVE`: Move the robot one unit forward in the direction it is currently facing.
- `LEFT`: Rotate the robot 90 degrees to the left.
- `RIGHT`: Rotate the robot 90 degrees to the right.

## Development
Run tests
```bash
npm run test
```

Build
```bash
npm run build
```
import React, { useState } from "react";

interface CommandInputProps {
  onCommandsSubmit: (commands: string[]) => void;
}

export const CommandInput: React.FC<CommandInputProps> = ({ onCommandsSubmit }) => {
  const [commands, setCommands] = useState("");

  const handleSubmit = () => {
    const commandList = commands
      .split("\n")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0);
    onCommandsSubmit(commandList);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded h-48"
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
        placeholder="Enter commands here (one per line)..."
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Run Commands
      </button>
    </div>
  );
};

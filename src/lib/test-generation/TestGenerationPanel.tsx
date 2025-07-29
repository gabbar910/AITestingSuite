import React, { useState } from "react";
import { useTestGeneration } from "./useTestGeneration";
import { GenerationConfig } from "./engine/types";

export const TestGenerationPanel: React.FC = () => {
  const [config, setConfig] = useState<GenerationConfig>({
    framework: "react",
    complexity: "medium",
    focusAreas: ["functionality", "security"],
    includeEdgeCases: true,
    includePerformanceTests: true,
    includeSecurityTests: true,
    maxScenariosPerCategory: 10,
    aiModel: "gpt-4",
  });

  const [codeInput, setCodeInput] = useState("");
  const testGen = useTestGeneration(config);

  return (
    <div>
      <h2>AI Test Generation</h2>
      <textarea value={codeInput} onChange={(e) => setCodeInput(e.target.value)} />
      <button onClick={() => testGen.generateTests(codeInput, "Sample Context")}>Generate Tests</button>

      {testGen.isGenerating && <p>Progress: {testGen.progress}% - {testGen.currentStep}</p>}
      {testGen.error && <p style={{ color: "red" }}>{testGen.error}</p>}
      {testGen.result && <pre>{JSON.stringify(testGen.result, null, 2)}</pre>}
    </div>
  );
};
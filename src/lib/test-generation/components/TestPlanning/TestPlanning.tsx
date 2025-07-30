import React, { useState } from "react";
import { GenerationConfig } from "../../engine/types";

export const TestPlanning: React.FC = () => {
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

  return (
    <React.Fragment>
        <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">AI Test Planning</h2>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  Create Plan
                </button>
        </div>
              
        <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Intelligent Test Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-900/20 rounded-lg">
                      <h4 className="font-medium text-purple-300 mb-2">Application Analysis</h4>
                      <p className="text-sm text-gray-300">AI analyzes your application architecture, identifies critical paths, and suggests optimal testing strategies.</p>
                    </div>
                    <div className="p-4 bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-300 mb-2">Risk Assessment</h4>
                      <p className="text-sm text-gray-300">Automatically identifies high-risk areas and prioritizes testing efforts based on business impact.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-300 mb-2">Coverage Optimization</h4>
                      <p className="text-sm text-gray-300">Ensures maximum test coverage with minimum effort using intelligent test case selection.</p>
                    </div>
                    <div className="p-4 bg-orange-900/20 rounded-lg">
                      <h4 className="font-medium text-orange-300 mb-2">Resource Planning</h4>
                      <p className="text-sm text-gray-300">Estimates testing time, resources, and identifies potential bottlenecks in advance.</p>
                    </div>
                  </div>
                </div>
        </div>
    </React.Fragment>
    
  );

};
import React, { useState } from "react";
import { GenerationConfig } from "../../engine/types";
import { Play, CheckCircle, AlertCircle, Clock } from "lucide-react";

export const TestExecution: React.FC = () => {
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

const [testProgress, setTestProgress] = useState(0);

  // Simulate test execution
  const runTests = async () => {
    setTestProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setTestProgress(i);
    }
  };

  return (
    <React.Fragment>
        <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Test Execution</h2>
                <button 
                  onClick={runTests}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Run All Tests</span>
                </button>
        </div>

        <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Execution Progress</h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Overall Progress</span>
                    <span className="text-sm font-medium">{testProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${testProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Passed</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-green-400">847</p>
                  </div>
                  <div className="p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Failed</span>
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold text-red-400">23</p>
                  </div>
                  <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-300">Running</span>
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-400">12</p>
                  </div>
                </div>
        </div>
    </React.Fragment>
  );
};
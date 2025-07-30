import React, { useState } from "react";
import { GenerationConfig } from "../../engine/types";


export const TestReports: React.FC = () => {
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
                <h2 className="text-2xl font-bold">AI-Generated Reports</h2>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  Export Report
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Test Coverage Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Frontend Components</span>
                      <span className="text-green-400 font-medium">98.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">API Endpoints</span>
                      <span className="text-blue-400 font-medium">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Database Operations</span>
                      <span className="text-yellow-400 font-medium">87.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Integration Points</span>
                      <span className="text-orange-400 font-medium">91.7%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <p className="text-sm text-blue-300 font-medium">Performance Optimization</p>
                      <p className="text-xs text-gray-400">3 slow API endpoints detected, recommend caching</p>
                    </div>
                    <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                      <p className="text-sm text-yellow-300 font-medium">Security Concern</p>
                      <p className="text-xs text-gray-400">Input validation missing on user registration</p>
                    </div>
                    <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                      <p className="text-sm text-green-300 font-medium">Quality Improvement</p>
                      <p className="text-xs text-gray-400">Error handling coverage increased by 15%</p>
                    </div>
                  </div>
                </div>
              </div>
    </React.Fragment> 
  );
};
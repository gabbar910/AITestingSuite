import React, { useState, useEffect } from "react";
import { GenerationConfig } from "../../engine/types";
import { Rocket, GitBranch, CheckSquare, XCircle, Webhook, Shield, Clock } from "lucide-react";

export const CiCd: React.FC = () => {
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

const [pipelineStatus, setPipelineStatus] = useState('idle');
const [deploymentQueue, setDeploymentQueue] = useState<any[]>([]);

  // Simulate CI/CD pipeline trigger
  const triggerPipeline = async () => {
    setPipelineStatus('running');
    
    // Simulate pipeline execution time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPipelineStatus('success');
    
    // Add to deployment queue
    const newDeployment = {
      id: Date.now(),
      branch: 'feature/user-auth',
      commit: 'a7b3c9d',
      status: 'deployed',
      timestamp: new Date().toLocaleTimeString(),
      tests: '47 passed'
    };
    
    setDeploymentQueue(prev => [newDeployment, ...prev.slice(0, 4)]);
  };

  // Initialize deployment queue
  useEffect(() => {
    setDeploymentQueue([
      { id: 1, branch: 'main', commit: 'f4e2d1a', status: 'deployed', timestamp: '14:32', tests: '52 passed' },
      { id: 2, branch: 'develop', commit: 'b8c5f7e', status: 'failed', timestamp: '13:45', tests: '3 failed' },
      { id: 3, branch: 'feature/api', commit: 'e3a9b2c', status: 'deployed', timestamp: '12:18', tests: '38 passed' }
    ]);
  }, []);

  return (
      <React.Fragment>
        <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">CI/CD Integration</h2>
                <button 
                  onClick={triggerPipeline}
                  disabled={pipelineStatus === 'running'}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <Rocket className="w-4 h-4" />
                  <span>{pipelineStatus === 'running' ? 'Pipeline Running...' : 'Trigger Pipeline'}</span>
                </button>
        </div>

        {/* Pipeline Status */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-blue-400" />
                  <span>Pipeline Status</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Active Pipelines</span>
                      <GitBranch className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-blue-400">
                      {pipelineStatus === 'running' ? '1' : '0'}
                    </p>
                  </div>
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Successful Builds</span>
                      <CheckSquare className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-green-400">127</p>
                  </div>
                  <div className="p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">Failed Builds</span>
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold text-red-400">8</p>
                  </div>
                </div>

                {/* Pipeline Stages */}
                <div className="space-y-3">
                  {[
                    { name: 'Code Analysis', status: pipelineStatus === 'running' ? 'running' : pipelineStatus === 'success' ? 'success' : 'pending' },
                    { name: 'AI Test Generation', status: pipelineStatus === 'running' ? 'running' : pipelineStatus === 'success' ? 'success' : 'pending' },
                    { name: 'Unit Tests', status: pipelineStatus === 'running' ? 'running' : pipelineStatus === 'success' ? 'success' : 'pending' },
                    { name: 'Integration Tests', status: pipelineStatus === 'running' ? 'running' : pipelineStatus === 'success' ? 'success' : 'pending' },
                    { name: 'Security Scan', status: pipelineStatus === 'running' ? 'running' : pipelineStatus === 'success' ? 'success' : 'pending' },
                    { name: 'Deployment', status: pipelineStatus === 'success' ? 'success' : 'pending' }
                  ].map((stage, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-purple-900/10 rounded-lg border border-purple-800/20">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          stage.status === 'success' ? 'bg-green-500' :
                          stage.status === 'running' ? 'bg-yellow-500 animate-pulse' :
                          'bg-gray-500'
                        }`} />
                        <span className="font-medium">{stage.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        stage.status === 'success' ? 'bg-green-900/30 text-green-300' :
                        stage.status === 'running' ? 'bg-yellow-900/30 text-yellow-300' :
                        'bg-gray-900/30 text-gray-400'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                  ))}
                </div>
        </div>

        {/* Integration Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Webhook className="w-5 h-5 text-purple-400" />
                    <span>Webhook Configuration</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-900/10 rounded-lg border border-green-800/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <div>
                          <p className="font-medium text-green-300">GitHub Actions</p>
                          <p className="text-xs text-gray-400">Connected to main repository</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-400">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-900/10 rounded-lg border border-blue-800/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <div>
                          <p className="font-medium text-blue-300">Jenkins</p>
                          <p className="text-xs text-gray-400">Build server integration</p>
                        </div>
                      </div>
                      <span className="text-xs text-blue-400">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-900/10 rounded-lg border border-orange-800/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full" />
                        <div>
                          <p className="font-medium text-orange-300">GitLab CI</p>
                          <p className="text-xs text-gray-400">Pending configuration</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Inactive</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <span>Quality Gates</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Test Coverage</span>
                      <span className="text-green-400 font-medium">≥ 80% ✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Security Score</span>
                      <span className="text-green-400 font-medium">A+ ✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Performance Budget</span>
                      <span className="text-yellow-400 font-medium">⚠ Warning</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Code Quality</span>
                      <span className="text-green-400 font-medium">Pass ✓</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <p className="text-sm text-yellow-300 font-medium">AI Recommendation</p>
                    <p className="text-xs text-gray-400 mt-1">Consider optimizing image assets to improve performance score</p>
                  </div>
                </div>
        </div>

        {/* Deployment History */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Recent Deployments</span>
                </h3>

                <div className="space-y-3">
                  {deploymentQueue.map((deployment) => (
                    <div key={deployment.id} className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/20">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          deployment.status === 'deployed' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{deployment.branch}</span>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded">{deployment.commit}</span>
                          </div>
                          <p className="text-sm text-gray-400">{deployment.tests}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium capitalize ${
                          deployment.status === 'deployed' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {deployment.status}
                        </p>
                        <p className="text-xs text-gray-500">{deployment.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
        </div>
      </React.Fragment>
  );
};
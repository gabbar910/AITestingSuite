import React, { useState } from "react";
import { useTestGeneration } from "./useTestGeneration";
import { GenerationConfig } from "../../engine/types";
import styles from "./TestGenerationPanel.module.css";
import { Brain, Upload, Wand2, Eye, Download, Zap, Target, Copy } from "lucide-react";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContext, setAiContext] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [testComplexity, setTestComplexity] = useState('medium');
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedTests, setGeneratedTests] = useState<any[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  const generateTests = async () => {
    setIsGenerating(true);
    setGeneratedTests([]);
    setGenerationStep(0);

    // Step 1: Code Analysis
    setGenerationStep(1);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockAnalysis = {
      components: ['LoginForm', 'Dashboard', 'UserProfile', 'ShoppingCart'],
      apis: ['/auth/login', '/users/profile', '/cart/add', '/orders/create'],
      complexity: testComplexity,
      framework: selectedFramework,
      riskAreas: ['Authentication', 'Payment Processing', 'Data Validation']
    };
    setAnalysisResults(mockAnalysis);

    // Step 2: Scenario Generation
    setGenerationStep(2);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const aiScenarios = [
      {
        id: 1,
        type: 'Web App',
        category: 'Authentication',
        scenario: 'Multi-factor authentication flow with edge cases',
        description: 'Tests login with MFA, SMS delays, expired tokens, and account lockouts',
        cases: 15,
        priority: 'Critical',
        confidence: 95,
        estimatedTime: '12 min',
        coverage: ['Happy path', 'Error handling', 'Security', 'Performance']
      },
      {
        id: 2,
        type: 'API',
        category: 'Data Validation',
        scenario: 'Input sanitization and SQL injection prevention',
        description: 'Validates all input fields against malicious payloads and edge cases',
        cases: 22,
        priority: 'High',
        confidence: 88,
        estimatedTime: '8 min',
        coverage: ['Security', 'Validation', 'Error responses']
      },
      {
        id: 3,
        type: 'Web App',
        category: 'E-commerce',
        scenario: 'Shopping cart persistence across sessions',
        description: 'Tests cart state management, local storage, and sync behavior',
        cases: 18,
        priority: 'Medium',
        confidence: 92,
        estimatedTime: '15 min',
        coverage: ['State management', 'Persistence', 'Cross-browser']
      },
      {
        id: 4,
        type: 'API',
        category: 'Performance',
        scenario: 'Concurrent user load and race conditions',
        description: 'Tests system behavior under high load and simultaneous operations',
        cases: 12,
        priority: 'High',
        confidence: 85,
        estimatedTime: '20 min',
        coverage: ['Concurrency', 'Performance', 'Resource limits']
      },
      {
        id: 5,
        type: 'Integration',
        category: 'Payment',
        scenario: 'Payment gateway integration and failure handling',
        description: 'Tests payment flows, timeouts, refunds, and webhook processing',
        cases: 25,
        priority: 'Critical',
        confidence: 90,
        estimatedTime: '18 min',
        coverage: ['Integration', 'Error handling', 'Webhooks', 'Transactions']
      }
    ];

    for (let i = 0; i < aiScenarios.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setGeneratedTests(prev => [...prev, aiScenarios[i]]);
    }

    // Step 3: Optimization
    setGenerationStep(3);
    await new Promise(resolve => setTimeout(resolve, 800));

    setGenerationStep(4); // Complete
    setIsGenerating(false);
  };

  // Toggle scenario selection
  const toggleScenarioSelection = (scenarioId: string) => {
    setSelectedScenarios(prev => 
      prev.includes(scenarioId) 
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId]
    );
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">AI Test Generation</h2>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-2 bg-purple-800/30 hover:bg-purple-700/40 rounded-lg transition-colors flex items-center space-x-2 text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Upload Code</span>
                  </button>
                  <button 
                    onClick={generateTests}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>{isGenerating ? 'Analyzing & Generating...' : 'Generate AI Tests'}</span>
                  </button>
                </div>
      </div>      
      
      {/* AI Configuration Panel */}
      <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>AI Configuration</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Application Context</label>
            <textarea 
              value={aiContext}
              onChange={(e) => setAiContext(e.target.value)}
              placeholder="Describe your application (e.g., E-commerce platform with user auth, payment processing...)"
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 resize-none"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Framework/Technology</label>
            <select 
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white"
            >
              <option value="react">React + Node.js</option>
              <option value="vue">Vue.js + Express</option>
              <option value="angular">Angular + .NET</option>
              <option value="django">Django + Python</option>
              <option value="rails">Ruby on Rails</option>
            </select>
            
            <label className="block text-sm text-gray-300 mb-2 mt-4">Test Complexity</label>
            <select 
              value={testComplexity}
              onChange={(e) => setTestComplexity(e.target.value)}
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white"
            >
              <option value="basic">Basic - Core functionality</option>
              <option value="medium">Medium - Edge cases included</option>
              <option value="advanced">Advanced - Comprehensive coverage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Focus Areas</label>
            <div className="space-y-2">
              {['Security', 'Performance', 'Accessibility', 'Cross-browser', 'Mobile'].map(area => (
                <label key={area} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-purple-600 bg-purple-900/20" />
                  <span className="text-gray-300">{area}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Generation Process */}
      {isGenerating && (
        <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent animate-spin rounded-full" />
            <span className="text-lg font-medium text-purple-300">AI Analysis in Progress</span>
          </div>
          
          <div className="space-y-3">
            {[
              { step: 1, label: 'Code Analysis & Pattern Recognition', active: generationStep >= 1 },
              { step: 2, label: 'Intelligent Scenario Generation', active: generationStep >= 2 },
              { step: 3, label: 'Test Case Optimization & Prioritization', active: generationStep >= 3 },
              { step: 4, label: 'Quality Assurance & Validation', active: generationStep >= 4 }
            ].map(item => (
              <div key={item.step} className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                item.active ? 'bg-purple-900/20 border border-purple-700/40' : 'bg-gray-900/10'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  item.active ? 'bg-purple-500 animate-pulse' : 'bg-gray-600'
                }`} />
                <span className={item.active ? 'text-purple-300' : 'text-gray-400'}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResults && (
                <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span>Code Analysis Results</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <h4 className="font-medium text-blue-300 mb-2">Components Detected</h4>
                      <div className="space-y-1">
                        {analysisResults.components.map((comp: string, idx: number) => (
                          <span key={idx} className="inline-block text-xs bg-blue-800/30 px-2 py-1 rounded mr-1 mb-1">{comp}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                      <h4 className="font-medium text-green-300 mb-2">API Endpoints</h4>
                      <div className="space-y-1">
                        {analysisResults.apis.map((api: string, idx: number) => (
                          <div key={idx} className="text-xs text-green-400 font-mono">{api}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                      <h4 className="font-medium text-orange-300 mb-2">Risk Areas</h4>
                      <div className="space-y-1">
                        {analysisResults.riskAreas.map((risk: string, idx: number) => (
                          <div key={idx} className="text-xs text-orange-400">⚠️ {risk}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
      )}

      {/* Generated Test Scenarios */}
      {generatedTests.length > 0 && (
                <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>AI-Generated Test Scenarios</span>
                      <span className="text-sm text-gray-400">({generatedTests.length} scenarios)</span>
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 rounded text-sm text-green-400 border border-green-600/30 transition-colors flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Export</span>
                      </button>
                      <button 
                        disabled={selectedScenarios.length === 0}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm disabled:opacity-50 transition-colors"
                      >
                        Generate Tests ({selectedScenarios.length})
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {generatedTests.map((test) => (
                      <div key={test.id} className={`border rounded-lg transition-all cursor-pointer ${
                        selectedScenarios.includes(test.id.toString()) 
                          ? 'bg-purple-900/20 border-purple-600/50' 
                          : 'bg-purple-900/10 border-purple-800/20 hover:border-purple-700/40'
                      }`}>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <input 
                                type="checkbox"
                                checked={selectedScenarios.includes(test.id.toString())}
                                onChange={() => toggleScenarioSelection(test.id.toString())}
                                className="mt-1 rounded border-purple-600 bg-purple-900/20"
                              />
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className={`px-2 py-1 rounded text-xs ${
                                    test.type === 'Web App' ? 'bg-blue-900/30 text-blue-300' : 
                                    test.type === 'API' ? 'bg-green-900/30 text-green-300' :
                                    'bg-orange-900/30 text-orange-300'
                                  }`}>
                                    {test.type}
                                  </div>
                                  <span className="text-xs text-gray-400">{test.category}</span>
                                  <div className={`px-2 py-1 rounded-full text-xs ${
                                    test.priority === 'Critical' ? 'bg-red-900/30 text-red-300' :
                                    test.priority === 'High' ? 'bg-orange-900/30 text-orange-300' : 'bg-yellow-900/30 text-yellow-300'
                                  }`}>
                                    {test.priority}
                                  </div>
                                </div>
                                
                                <h4 className="font-medium text-white mb-1">{test.scenario}</h4>
                                <p className="text-sm text-gray-400 mb-3">{test.description}</p>
                                
                                <div className="flex items-center space-x-6 text-xs text-gray-400">
                                  <span>{test.cases} test cases</span>
                                  <span>~{test.estimatedTime}</span>
                                  <span className="flex items-center space-x-1">
                                    <Target className="w-3 h-3" />
                                    <span>{test.confidence}% confidence</span>
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-2 mt-2">
                                  {test.coverage.map((area: string, idx: number) => (
                                    <span key={idx} className="text-xs bg-gray-800/50 px-2 py-1 rounded">{area}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button className="p-1 hover:bg-purple-800/30 rounded transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-purple-800/30 rounded transition-colors">
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {generatedTests.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">AI Insights</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Based on your code analysis, I recommend prioritizing <strong>authentication</strong> and <strong>payment processing</strong> tests first, 
                        as they represent the highest business risk. The generated test suite provides <strong>87% code coverage</strong> with 
                        optimized execution time.
                      </p>
                    </div>
                  )}
                </div>
      )} 

    </React.Fragment>
  );
};
'use client';

import React, { useState, useEffect } from 'react';
import { Play, Brain, FileText, BarChart3, Settings, Plus, CheckCircle, AlertCircle, Clock, Zap, Target, Code, Globe, GitBranch, Webhook, Shield, Rocket, CheckSquare, XCircle, Upload, Wand2, Eye, Download, Copy } from 'lucide-react';

export default function TestingSuite() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [generatedTests, setGeneratedTests] = useState<any[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState('idle');
  const [deploymentQueue, setDeploymentQueue] = useState<any[]>([]);
  const [aiContext, setAiContext] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [testComplexity, setTestComplexity] = useState('medium');
  const [generationStep, setGenerationStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  // Enhanced AI test generation with multi-step process
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

  // Simulate test execution
  const runTests = async () => {
    setTestProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setTestProgress(i);
    }
  };

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

  const stats = [
    { label: 'Tests Generated', value: '1,247', icon: Brain, color: 'text-purple-600' },
    { label: 'Tests Executed', value: '892', icon: Play, color: 'text-blue-600' },
    { label: 'Coverage', value: '94.2%', icon: Target, color: 'text-green-600' },
    { label: 'Success Rate', value: '96.8%', icon: CheckCircle, color: 'text-emerald-600' }
  ];

  const recentTests = [
    { name: 'E-commerce Checkout Flow', status: 'passed', type: 'Web App', duration: '2m 34s' },
    { name: 'User API Authentication', status: 'failed', type: 'API', duration: '45s' },
    { name: 'Product Search Functionality', status: 'running', type: 'Web App', duration: '1m 12s' },
    { name: 'Payment Gateway Integration', status: 'passed', type: 'API', duration: '3m 01s' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Testing Suite</h1>
                <p className="text-sm text-purple-300">Intelligent Test Automation Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Test Suite</span>
              </button>
              <Settings className="w-6 h-6 text-purple-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-black/20 backdrop-blur-sm border-r border-purple-800/30 min-h-screen">
          <div className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'planning', label: 'Test Planning', icon: FileText },
              { id: 'generation', label: 'AI Generation', icon: Brain },
              { id: 'execution', label: 'Test Execution', icon: Play },
              { id: 'cicd', label: 'CI/CD Integration', icon: Settings },
              { id: 'reports', label: 'Reports', icon: BarChart3 }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                    : 'hover:bg-purple-800/10 text-gray-300 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Tests */}
              <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>Recent Test Runs</span>
                </h2>
                <div className="space-y-3">
                  {recentTests.map((test, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/20">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          test.status === 'passed' ? 'bg-green-500' :
                          test.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
                        }`} />
                        <div>
                          <h3 className="font-medium">{test.name}</h3>
                          <p className="text-sm text-gray-400 flex items-center space-x-2">
                            {test.type === 'Web App' ? <Globe className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                            <span>{test.type}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium capitalize ${
                          test.status === 'passed' ? 'text-green-400' :
                          test.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {test.status}
                        </p>
                        <p className="text-xs text-gray-500">{test.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'planning' && (
            <div className="space-y-6">
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
            </div>
          )}

          {activeTab === 'generation' && (
            <div className="space-y-6">
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
            </div>
          )}

          {activeTab === 'execution' && (
            <div className="space-y-6">
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
            </div>
          )}

          {activeTab === 'cicd' && (
            <div className="space-y-6">
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
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
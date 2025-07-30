'use client';

import React, { useState, useEffect } from 'react';
import { Play, Brain, FileText, BarChart3, Settings, Plus, CheckCircle, AlertCircle, Clock, Zap, Target, Code, Globe, GitBranch, Webhook, Shield, Rocket, CheckSquare, XCircle, Upload, Wand2, Eye, Download, Copy } from 'lucide-react';
import { TestGenerationPanel } from '../lib/test-generation/components/TestGeneration/TestGenerationPanel';
import { Dashboard } from '../lib/test-generation/components/Dashboard/Dashboard';
import { TestPlanning } from '../lib/test-generation/components/TestPlanning/TestPlanning';
import { TestExecution } from '../lib/test-generation/components/TestExecution/TestExecution';
import { CiCd } from '../lib/test-generation/components/CiCd/CiCd';
import { TestReports } from '../lib/test-generation/components/TestReports/TestReports';

export default function TestingSuite() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
              <Dashboard />
            </div>
          )}

          {activeTab === 'planning' && (
            <div className="space-y-6">
              <TestPlanning />
            </div>
          )}

          {activeTab === 'generation' && (
            <div className="space-y-6">                            
              <TestGenerationPanel />
            </div>
          )}

          {activeTab === 'execution' && (
            <div className="space-y-6">
              <TestExecution />
            </div>
          )}

          {activeTab === 'cicd' && (
            <div className="space-y-6">
              <CiCd />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <TestReports />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
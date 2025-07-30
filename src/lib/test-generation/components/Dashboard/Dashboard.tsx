// create component structure here
import React, { useState } from "react";
import { GenerationConfig } from "../../engine/types";
import { Brain, Upload, Code, Globe, CheckCircle, Play, Target, Clock } from "lucide-react";

interface DashboardProps {
  title?: string;
}

export const Dashboard: React.FC = () => {
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
    <React.Fragment>
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
  </React.Fragment>
  );
};
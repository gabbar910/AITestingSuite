"use client";

import React, { useState } from "react";
import { Brain, Search, Loader2, AlertCircle } from "lucide-react";
import styles from "./JiraTasks.module.css";

interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    description?: string;
    status: { name: string };
    assignee?: { displayName: string };
  };
}

export const JiraTasks: React.FC = () => {
  const [jiraUrl, setJiraUrl] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [label, setLabel] = useState("feature");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [issues, setIssues] = useState<JiraIssue[]>([]);

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setIssues([]);

    try {
      const response = await fetch("/api/jira", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jiraUrl,
          token,
          label,
          email,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to fetch Jira tasks: ${errText}`);
      }

      const data = await response.json();
      setIssues(data.issues || []);
    } catch (err) {
      console.error("Jira fetch error:", err);
      setError(
        "Failed to fetch tasks. Please check your Jira URL, email, token, or network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFetchDisabled = !jiraUrl || !email || !token || loading;

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>Jira Configuration</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Jira URL */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Jira URL</label>
            <input
              type="text"
              value={jiraUrl}
              onChange={(e) => setJiraUrl(e.target.value)}
              placeholder="https://your-domain.atlassian.net"
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Jira Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@domain.com"
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Token */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              API Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Jira API token"
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Feature Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Feature label (e.g., 'feature')"
              className="w-full p-3 bg-purple-900/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleFetch}
            disabled={isFetchDisabled}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Fetching Tasks...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Fetch Tasks</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 flex items-center text-red-300">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Display */}
      {issues.length > 0 && (
        <div className="bg-black/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Search className="w-5 h-5 text-blue-400" />
            <span>Found {issues.length} Tasks</span>
          </h3>

          <div className="space-y-4">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="border rounded-lg transition-all bg-purple-900/10 border-purple-800/20 hover:border-purple-700/40"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-blue-400 font-mono">
                          {issue.key}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-300">
                          {issue.fields.status.name}
                        </span>
                      </div>

                      <h4 className="font-medium text-white mb-1">
                        {issue.fields.summary}
                      </h4>

                      {issue.fields.assignee && (
                        <div className="text-sm text-gray-400">
                          Assignee: {issue.fields.assignee.displayName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
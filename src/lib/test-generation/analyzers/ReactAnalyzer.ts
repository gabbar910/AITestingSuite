import { CodeAnalysisResult, CodebaseInfo, ComponentInfo, ApiEndpoint, RiskArea, CodePattern } from "../engine/types";
import { CodeAnalyzer } from "../analyzers/CodeAnalyzers";


export class ReactAnalyzer extends CodeAnalyzer {
  async analyzeCode(code: string): Promise<CodeAnalysisResult> {
    // React-specific analysis logic
    const components = this.extractReactComponents(code);
    const hooks = this.extractHooks(code);
    const routes = this.extractRoutes(code);
    const apis = this.extractAPICalls(code);
    
    return {
      components,
      apis,
      dependencies: this.extractDependencies(code),
      riskAreas: this.identifyRiskAreas(components, apis),
      complexity: this.calculateComplexity(components, hooks),
      coverage: 0,
      framework: 'react',
      patterns: this.identifyPatterns(code)
    };
  }

  async analyzeStructure(info: CodebaseInfo): Promise<CodeAnalysisResult> {
    // Analyze based on project structure
    return {
      components: info.components || [],
      apis: info.apis || [],
      dependencies: info.dependencies || [],
      riskAreas: [],
      complexity: 'medium',
      coverage: 0,
      framework: 'react',
      patterns: []
    };
  }

  private extractReactComponents(code: string): ComponentInfo[] {
    // Implementation for extracting React components
    const componentRegex = /(?:function|const)\s+([A-Z][a-zA-Z0-9]*)\s*(?:\(|\s*=)/g;
    const components: ComponentInfo[] = [];
    let match;

    while ((match = componentRegex.exec(code)) !== null) {
      components.push({
        name: match[1],
        type: 'functional',
        props: [],
        methods: [],
        complexity: 'medium'
      });
    }

    return components;
  }

  private extractHooks(code: string): string[] {
    const hookRegex = /use[A-Z][a-zA-Z0-9]*/g;
    return Array.from(new Set(code.match(hookRegex) || []));
  }

  private extractRoutes(code: string): string[] {
    const routeRegex = /<Route[^>]*path=["']([^"']+)["']/g;
    const routes: string[] = [];
    let match;

    while ((match = routeRegex.exec(code)) !== null) {
      routes.push(match[1]);
    }

    return routes;
  }

  private extractAPICalls(code: string): ApiEndpoint[] {
    const apiRegex = /(?:fetch|axios\.(?:get|post|put|delete))\s*\(\s*["'`]([^"'`]+)["'`]/g;
    const apis: ApiEndpoint[] = [];
    let match;

    while ((match = apiRegex.exec(code)) !== null) {
      apis.push({
        path: match[1],
        method: this.inferMethod(match[0]),
        parameters: [],
        security: 'none'
      });
    }

    return apis;
  }

  private inferMethod(apiCall: string): string {
    if (apiCall.includes('.post')) return 'POST';
    if (apiCall.includes('.put')) return 'PUT';
    if (apiCall.includes('.delete')) return 'DELETE';
    return 'GET';
  }

  private extractDependencies(code: string): string[] {
    const importRegex = /import.*from\s+["']([^"']+)["']/g;
    const deps: string[] = [];
    let match;

    while ((match = importRegex.exec(code)) !== null) {
      if (!match[1].startsWith('.')) {
        deps.push(match[1]);
      }
    }

    return Array.from(new Set(deps));
  }

  private identifyRiskAreas(components: ComponentInfo[], apis: ApiEndpoint[]): RiskArea[] {
    const risks: RiskArea[] = [];

    // Authentication-related components
    if (components.some(c => c.name.toLowerCase().includes('login') || c.name.toLowerCase().includes('auth'))) {
      risks.push({ area: 'Authentication', severity: 'high', description: 'Authentication components require thorough security testing' });
    }

    // Payment-related APIs
    if (apis.some(a => a.path.includes('payment') || a.path.includes('billing'))) {
      risks.push({ area: 'Payment Processing', severity: 'critical', description: 'Payment endpoints need comprehensive testing' });
    }

    return risks;
  }

  private calculateComplexity(components: ComponentInfo[], hooks: string[]): 'low' | 'medium' | 'high' {
    const totalComplexity = components.length + (hooks.length * 0.5);
    
    if (totalComplexity < 10) return 'low';
    if (totalComplexity < 25) return 'medium';
    return 'high';
  }

  private identifyPatterns(code: string): CodePattern[] {
    const patterns: CodePattern[] = [];

    if (code.includes('useState')) {
      patterns.push({ name: 'State Management', type: 'hook', frequency: (code.match(/useState/g) || []).length });
    }

    if (code.includes('useEffect')) {
      patterns.push({ name: 'Side Effects', type: 'hook', frequency: (code.match(/useEffect/g) || []).length });
    }

    return patterns;
  }
}
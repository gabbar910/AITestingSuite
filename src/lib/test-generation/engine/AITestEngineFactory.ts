import { GenerationConfig } from './types'; // Adjust the path if needed
import { AITestEngine } from './AITestEngine'; // Adjust the path if needed

export class AITestEngineFactory {
  static create(config: GenerationConfig): AITestEngine {
    return new AITestEngine(config);
  }

  static createForFramework(
    framework: string,
    options: Partial<GenerationConfig> = {}
  ): AITestEngine {
    const defaultConfig: GenerationConfig = {
      framework,
      complexity: 'medium',
      focusAreas: ['functionality', 'security', 'performance'],
      includeEdgeCases: true,
      includePerformanceTests: true,
      includeSecurityTests: true,
      maxScenariosPerCategory: 10,
      aiModel: 'gpt-4',
      ...options
    };

    return new AITestEngine(defaultConfig);
  }
}
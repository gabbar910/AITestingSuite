import type { AITestEngine } from '../engine/AITestEngine';

export interface AITestPlugin {
  name: string;
  version: string;
  install(engine: AITestEngine): void;
  uninstall(engine: AITestEngine): void;
}

export class CustomFrameworkPlugin implements AITestPlugin {
  name = 'custom-framework';
  version = '1.0.0';

  install(engine: AITestEngine): void {
    // Add custom analyzer and generator
    // engine.addAnalyzer('custom', new CustomAnalyzer());
    // engine.addGenerator('custom', new CustomGenerator());
  }

  uninstall(engine: AITestEngine): void {
    // Remove custom components
  }
}
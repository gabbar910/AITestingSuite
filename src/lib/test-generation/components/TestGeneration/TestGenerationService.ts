import { GenerationConfig, GenerationResult } from "../../engine/types";
import { AITestEngine } from "../../engine/AITestEngine";
import { AITestEngineFactory } from "../../engine/AITestEngineFactory";

export class TestGenerationService {
  private engine: AITestEngine | null = null;
  private config: GenerationConfig | null = null;

  async initialize(config: GenerationConfig): Promise<void> {
    this.config = config;
    this.engine = AITestEngineFactory.create(config);
  }

  async generateTests(
    codeInput: string | File[],
    context: string,
    onProgress?: (step: string, progress: number) => void
  ): Promise<GenerationResult> {
    if (!this.engine) throw new Error("Engine not initialized. Call initialize() first.");

    try {
      onProgress?.("Processing code input...", 10);
      const codebase = await this.processCodeInput(codeInput);

      onProgress?.("Analyzing codebase...", 30);
      const result = await this.engine.generateTests(codebase, context);

      onProgress?.("Generation complete", 100);
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { 
        success: false, 
        error: errorMessage, 
        scenarios: [], 
        analysis: null, 
        metadata: null 
      };
    }
  }

  private async processCodeInput(input: string | File[]): Promise<string> {
    if (typeof input === "string") return input;

    const codeFiles = await Promise.all(
      input.map(async (file) => {
        const content = await file.text();
        return `// File: ${file.name}\n${content}`;
      })
    );

    return codeFiles.join("\n\n");
  }

  updateConfig(newConfig: Partial<GenerationConfig>): void {
    if (this.config) {
      this.config = { ...this.config, ...newConfig };
      this.engine = AITestEngineFactory.create(this.config);
    }
  }

  getConfig(): GenerationConfig | null {
    return this.config;
  }
};
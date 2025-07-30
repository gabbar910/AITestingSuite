import { useState, useCallback, useRef, useEffect } from "react";
import { TestGenerationService } from "./TestGenerationService";
import { GenerationConfig, GenerationResult } from "../../engine/types";


export interface UseTestGenerationReturn {
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  result: GenerationResult | null;
  error: string | null;
  generateTests: (codeInput: string | File[], context: string) => Promise<void>;
  updateConfig: (config: Partial<GenerationConfig>) => void;
  reset: () => void;
}

export const useTestGeneration = (initialConfig: GenerationConfig): UseTestGenerationReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const serviceRef = useRef<TestGenerationService>(new TestGenerationService());

  const initializeService = useCallback(async (config: GenerationConfig) => {
    try {
      await serviceRef.current.initialize(config);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      }
  }, []);

  useEffect(() => {
    initializeService(initialConfig);
  }, [initialConfig, initializeService]);

  const generateTests = useCallback(async (codeInput: string | File[], context: string) => {
    setIsGenerating(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const generationResult = await serviceRef.current.generateTests(codeInput, context, (step, p) => {
        setCurrentStep(step);
        setProgress(p);
      });

      setResult(generationResult);
      if (!generationResult.success) setError(generationResult.error || "Generation failed");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const updateConfig = useCallback((newConfig: Partial<GenerationConfig>) => {
    serviceRef.current.updateConfig(newConfig);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
    setCurrentStep("");
  }, []);

  return { isGenerating, progress, currentStep, result, error, generateTests, updateConfig, reset };
};
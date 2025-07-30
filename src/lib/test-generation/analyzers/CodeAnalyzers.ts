import { CodeAnalysisResult, CodebaseInfo } from "../engine/types";

export abstract class CodeAnalyzer {
  abstract analyzeCode(code: string): Promise<CodeAnalysisResult>;
  abstract analyzeStructure(info: CodebaseInfo): Promise<CodeAnalysisResult>;
}
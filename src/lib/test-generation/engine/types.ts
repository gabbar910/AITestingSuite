// 1. CORE INTERFACES & TYPES
export interface TestScenario {
  id: string;
  type: 'unit' | 'integration' | 'e2e' | 'api' | 'performance' | 'security';
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  estimatedDuration: number;
  framework: string;
  testCases: TestCase[];
  coverage: CoverageArea[];
  tags: string[];
  dependencies: string[];
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: TestStep[];
  assertions: Assertion[];
  setup?: string;
  teardown?: string;
  data?: Record<string, any>;
}

export interface TestStep {
  action: 'navigate' | 'click' | 'type' | 'wait' | 'api_call' | 'verify' | 'custom';
  target?: string;
  value?: any;
  description: string;
}

export interface CodeAnalysisResult {
  components: ComponentInfo[];
  apis: ApiEndpoint[];
  dependencies: string[];
  riskAreas: RiskArea[];
  complexity: 'low' | 'medium' | 'high';
  coverage: number;
  framework: string;
  patterns: CodePattern[];
}

export interface GenerationConfig {
  framework: string;
  complexity: 'basic' | 'medium' | 'advanced';
  focusAreas: string[];
  includeEdgeCases: boolean;
  includePerformanceTests: boolean;
  includeSecurityTests: boolean;
  maxScenariosPerCategory: number;
  aiModel: 'gpt-4' | 'claude' | 'gemini' | 'local';
  customPrompts?: Record<string, string>;
}

// 6. SUPPORTING INTERFACES
export interface ComponentInfo {
  name: string;
  type: 'functional' | 'class' | 'hook';
  props: string[];
  methods: string[];
  complexity: 'low' | 'medium' | 'high';
}

export interface ApiEndpoint {
  path: string;
  method: string;
  parameters: Parameter[];
  security: 'none' | 'basic' | 'bearer' | 'oauth';
}

export interface RiskArea {
  area: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface CodePattern {
  name: string;
  type: string;
  frequency: number;
}

export interface CodebaseInfo {
  components?: ComponentInfo[];
  apis?: ApiEndpoint[];
  dependencies?: string[];
  structure?: FileStructure[];
}

export interface FileStructure {
  path: string;
  type: 'component' | 'service' | 'utility' | 'test' | 'config';
  size: number;
}

export interface GenerationResult {
  success: boolean;
  scenarios: TestScenario[];
  analysis: CodeAnalysisResult | null;
  metadata: GenerationMetadata | null;
  error?: string;
}

export interface GenerationMetadata {
  generatedAt: Date;
  totalScenarios: number;
  estimatedDuration: number;
  coverage: number;
}

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface Assertion {
  type: 'exists' | 'visible' | 'text_contains' | 'url_contains' | 'equals';
  target?: string;
  expected: any;
}

export interface CoverageArea {
  area: string;
  percentage: number;
}
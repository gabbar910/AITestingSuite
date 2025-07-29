import { TestCase, TestScenario } from "../engine/types"; 
import { TestGenerator } from "../generators/TestGenerator";

export class VueTestGenerator extends TestGenerator {
  async generateTestCases(scenario: TestScenario): Promise<TestCase[]> {
    return []; // TODO: Implement Vue-specific tests
  }
  parseAIResponse(response: string): TestScenario[] {
    return [];
  }
}
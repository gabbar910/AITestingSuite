import { TestCase, TestScenario } from "../engine/types"; 
import { TestGenerator } from "../generators/TestGenerator";

export class APITestGenerator extends TestGenerator {
  async generateTestCases(scenario: TestScenario): Promise<TestCase[]> {
    return [];
  }
  parseAIResponse(response: string): TestScenario[] {
    return [];
  }
}
import { TestCase, TestScenario } from "../engine/types"; 

export abstract class TestGenerator {
  abstract generateTestCases(scenario: TestScenario): Promise<TestCase[]>;
  abstract parseAIResponse(response: string): TestScenario[];
}
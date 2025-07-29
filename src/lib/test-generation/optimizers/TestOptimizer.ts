import { TestCase, TestScenario } from "../engine/types"; 

export abstract class TestOptimizer {
  abstract optimize(scenarios: TestScenario[]): Promise<TestScenario[]>;
}
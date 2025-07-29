import { TestCase, TestScenario } from "../engine/types"; 
import { TestOptimizer } from "../optimizers/TestOptimizer";

export class PriorityOptimizer extends TestOptimizer {
  async optimize(scenarios: TestScenario[]): Promise<TestScenario[]> {
    return scenarios.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}
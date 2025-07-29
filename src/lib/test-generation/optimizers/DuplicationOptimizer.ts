import { TestCase, TestScenario } from "../engine/types"; 
import { TestOptimizer } from "../optimizers/TestOptimizer";

export class DuplicationOptimizer extends TestOptimizer {
  async optimize(scenarios: TestScenario[]): Promise<TestScenario[]> {
    const unique = new Map<string, TestScenario>();
    
    for (const scenario of scenarios) {
      const key = `${scenario.type}_${scenario.category}_${scenario.title}`;
      if (!unique.has(key) || unique.get(key)!.confidence < scenario.confidence) {
        unique.set(key, scenario);
      }
    }
    
    return Array.from(unique.values());
  }
}
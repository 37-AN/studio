const { calculateMonthlyTotal, salaryReplacementPercentage, disciplineConsistency, quitJobReadiness } = require('../src/lib/calculations');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// calculateMonthlyTotal
const entries = [{ amount: 100 }, { amount: 200 }, { amount: 0 }];
assert(calculateMonthlyTotal(entries) === 300, 'monthly total should be 300');

// salaryReplacementPercentage
assert(salaryReplacementPercentage(9000, 18000) === 50, 'should be 50%');
assert(salaryReplacementPercentage(0, 18000) === 0, 'should be 0%');

// disciplineConsistency
const d = [
  { date: '2026-01-02', completed: true },
  { date: '2026-01-01', completed: false },
  { date: '2025-12-31', completed: true },
];
const cons = disciplineConsistency(d);
assert(cons === 67 || cons === 66, 'consistency approx 66/67%');

// quitJobReadiness
assert(quitJobReadiness([19000, 20000, 18000], 18000) === true, 'should be ready');
assert(quitJobReadiness([18000, 17000, 19000], 18000) === false, 'should not be ready');

console.log('All calculation smoke tests passed');

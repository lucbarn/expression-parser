const mainFunctions = require('../main.js');

const validExpression = mainFunctions.validExpression;
const solver = mainFunctions.solver;

describe('Check valid expressions', () => {
  it('Evaluates the sum of two integers as valid', () => {
    const expr1 = '1 + 1';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates two consecutive operators as invalid', () => {
    const expr2 = '1 -- 2';
    expect(validExpression(expr2)).toBe(false);
  })
});

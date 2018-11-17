const mainFunctions = require('../main.js');

const validExpression = mainFunctions.validExpression;
const solver = mainFunctions.solver;

describe('Check valid expressions', () => {

  it('Evaluates an empty string as valid', () => {
    const expr1 = '';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates a single integer as valid', () => {
    const expr1 = '10';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates a single negative as valid', () => {
    const expr1 = '-8';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates a single integer inside parentheses as valid', () => {
    const expr1 = '(1)';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates the sum of two integers as valid', () => {
    const expr1 = '1 + 1';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates two consecutive operators as invalid', () => {
    const expr2 = '1 -- 2';
    expect(validExpression(expr2)).toBe(false);
  })

});

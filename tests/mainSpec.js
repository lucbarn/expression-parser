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

  it('Evaluates a single negative integer as valid', () => {
    const expr1 = '-8';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates a single integer inside parentheses as valid', () => {
    const expr1 = '(1)';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates a single negative integer with minus sign outside parentheses as valid', () => {
    const expr1 = '-(1)';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates a single positive integer with leading plus sign as valid', () => {
    const expr1 = '+1';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates multiple leading plus signs as invalid', () => {
    const expr1 = '++1';
    expect(validExpression(expr1)).toBe(false);
  })

  it('Evaluates a single integer inside multiple consecutive parentheses as valid', () => {
    const expr1 = '((1))';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates the sum of two integers as valid', () => {
    const expr1 = '1 + 1';
    expect(validExpression(expr1)).toBe(true);
  })

  it('White spaces are ignored', () => {
    const expr1 = '  1     + 1 ';
    expect(validExpression(expr1)).toBe(true);
  })

  it('Evaluates two consecutive operators as invalid', () => {
    const expr1 = '1 -- 2';
    expect(validExpression(expr1)).toBe(false);
  })

  it('Evaluates a trailing sign as invalid', () => {
    const expr1 = '10 + 2 +';
    expect(validExpression(expr1)).toBe(false);
  })

});

describe('Check results', () => {

  it('Evaluates a single integer as equal to itself', () => {
    const expr1 = '3';
    expect(solver(expr1)).toBe(3);
  })

  it('Evaluates a sum', () => {
    const expr1 = '10 + 12';
    expect(solver(expr1)).toBe(10 + 12);
  })

  it('Evaluates a subtraction', () => {
    const expr1 = '-2 - 5';
    expect(solver(expr1)).toBe(-2 - 5);
  })

  it('Evaluates a multiplication', () => {
    const expr1 = '2 * (-2)';
    expect(solver(expr1)).toBe(2 * (-2));
  })

  it('Evaluates a division', () => {
    const expr1 = '-10 / (-2)';
    expect(solver(expr1)).toBe(-10 / (-2));
  })

});

const mainFunctions = require('../main.js');

const unsignedValue = mainFunctions.unsignedValue;
const validExpression = mainFunctions.validExpression;
const evaluateExpression = mainFunctions.evaluateExpression;

describe('Check unsigned value', () => {

  const tolerance = 0.000001;

  it('Evaluates 10000 random integers', () => {
    let n;
    let s;
    let parsed;
    let diff;
    for (let i = 0; i < 10000; i++) {
      n = Math.floor((Math.random() * 100000));
      s = n.toString();
      parsed = unsignedValue(s);
      diff = Math.abs(parsed-n);
      expect(diff).toBeLessThan(tolerance);
    }
  });

  it('Evaluates 10000 random floats', () => {
    let n;
    let s;
    let parsed;
    let diff;
    for (let i = 0; i < 10000; i++) {
      n = (Math.random() * 100000);
      s = n.toString();
      parsed = unsignedValue(s);
      diff = Math.abs(parsed-n);
      expect(diff).toBeLessThan(tolerance);
    }
  });

});

describe('Check valid expressions', () => {

  it('Evaluates an empty string as valid', () => {
    const expr1 = '';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates a single integer as valid', () => {
    const expr1 = '10';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates a single negative integer as valid', () => {
    const expr1 = '-8';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates a single integer inside parentheses as valid', () => {
    const expr1 = '(1)';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates a single negative integer with minus sign outside parentheses as valid', () => {
    const expr1 = '-(1)';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates a single positive integer with leading plus sign as valid', () => {
    const expr1 = '+1';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates multiple leading plus signs as invalid', () => {
    const expr1 = '++1';
    expect(validExpression(expr1)).toBe(false);
  });

  it('Evaluates a single integer inside multiple consecutive parentheses as valid', () => {
    const expr1 = '((1))';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates the sum of two integers as valid', () => {
    const expr1 = '1 + 1';
    expect(validExpression(expr1)).toBe(true);
  });

  it('White spaces are ignored', () => {
    const expr1 = '  1     + 1 ';
    expect(validExpression(expr1)).toBe(true);
  });

  it('Evaluates two consecutive operators as invalid', () => {
    const expr1 = '1 -- 2';
    expect(validExpression(expr1)).toBe(false);
  });

  it('Evaluates a trailing sign as invalid', () => {
    const expr1 = '10 + 2 +';
    expect(validExpression(expr1)).toBe(false);
  });

});

describe('Check results', () => {

  it('Evaluates a single integer as equal to itself', () => {
    const expr1 = '3';
    expect(evaluateExpression(expr1)).toBe(3);
  });

  it('Evaluates a single negative integer as equal to itself', () => {
    const expr1 = '-3';
    expect(evaluateExpression(expr1)).toBe(-3);
  });

  it('Evaluates a sum', () => {
    const expr1 = '10 + 12';
    expect(evaluateExpression(expr1)).toBe(10 + 12);
  });

  it('Evaluates a subtraction', () => {
    const expr1 = '-2 - 5';
    expect(evaluateExpression(expr1)).toBe(-2 - 5);
  });

  it('Evaluates a multiplication', () => {
    const expr1 = '2 * (-2)';
    expect(evaluateExpression(expr1)).toBe(2 * (-2));
  });

  it('Evaluates a division', () => {
    const expr1 = '-10 / (-2)';
    expect(evaluateExpression(expr1)).toBe(-10 / (-2));
  });

  it('Evaluates an expression with multiple parantheses', () => {
    const expr1 = '10 + (-(1) * 3 + (-0)) / 2';
    expect(evaluateExpression(expr1)).toBe(10 + (-(1) * 3 + (-0)) / 2);
  });

});

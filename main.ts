export function validExpression(exp: string): boolean {
  const expression = exp.replace(/\s/g, '');
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operators = ['+', '-', '*', '/'];
  const validChars = [...digits, ...operators, '.', '(', ')'];
  let parenthesesCount = 0;
  let operatorsCount = 0;
  let dotsCount = 0;
  let current;
  let index;
  if (['*', '/', '.'].includes(expression.charAt(0))) {
    return false;
  }
  for (let i = 0; i < expression.length; i++) {
    current = expression.charAt(i);
    if (!validChars.includes(current)) {
      return false;
    }
    if (operators.includes(current) && dotsCount > 0) {
      dotsCount--;
    }
    if (current === '.') {
      if ((i == 0) || (i == expression.length - 1) || !digits.includes(expression.charAt(i-1)) || !digits.includes(expression.charAt(i+1))) {
        return false;
      }
      if (dotsCount > 0) {
        return false;
      }
      dotsCount++;
    }
    if (current === '(') {
      if (i > 0 && !['+', '-', '*', '/', '('].includes(expression.charAt(i-1))) {
        return false;
      }
      if (i < expression.length - 1 && ['*', '/', '.'].includes(expression.charAt(i+1))) {
        return false;
      }
      parenthesesCount++;
    } else if (current === ')') {
      if (i > 0 && ['+', '-', '*', '/', '.', '('].includes(expression.charAt(i-1))) {
        return false;
      }
      if (i < expression.length - 1 && !['+', '-', '*', '/', ')'].includes(expression.charAt(i+1))) {
        return false;
      }
      parenthesesCount--;
    }
    if (['+', '-', '*', '/'].includes(current)) {
      operatorsCount++;
    } else if (operatorsCount > 0 && current != ')') {
      operatorsCount--;
    }
    if (parenthesesCount < 0) {
      return false;
    }
    if (operatorsCount > 1) {
      return false;
    }
  }
  return parenthesesCount === 0 && operatorsCount === 0;
}


export function solver(exp: string): number {
  const expression = exp.replace(/\s/g, '');
  if (!validExpression(expression)) {
    throw 'Invalid expression';
  }
  let res = 0;
  let current;
  let operator = '+';
  let i = 0;
  let parenthesesCount;
  let tempIndex;
  let tempOperator;
  let tempValue;
  if (['+', '-'].includes(expression[0])) {
    operator = expression[0];
    i = 1;
  }
  while (i < expression.length) {
    if (i > 1) {
      tempOperator = expression[i-1];
    }
    if (expression[i] === '(') {
      parenthesesCount = 0;
      tempIndex = i;
      while (true) {
        if (expression[i] === '(') {
          parenthesesCount++;
        } else if (expression[i] === ')') {
          parenthesesCount--;
        }
        if (parenthesesCount === 0) {
          break;
        }
        i++;
      }
      if (typeof(current) === 'undefined') {
        current = solver(expression.slice(tempIndex + 1, i));
      } else {
        tempValue = solver(expression.slice(tempIndex + 1, i));
      }
    } else {
      tempIndex = i;
      while (i < expression.length - 1) {
        if (['+', '-', '*', '/'].includes(expression[i+1])) {
          break;
        }
        i++;
      }
      if (typeof(current) === 'undefined') {
        current = Number(expression.slice(tempIndex, i+1));
      } else {
        tempValue = Number(expression.slice(tempIndex, i+1));
      }
    }
    if (['+', '-'].includes(tempOperator)) {
      if (operator === '+') {
        res += current;
      } else {
        res -= current;
      }
      operator = tempOperator;
      current = tempValue;
    } else if (['*', '/'].includes(tempOperator)) {
      if (tempOperator === '*') {
        current *= tempValue;
      } else {
        current /= tempValue;
      }
    }
    i += 2;
  }
  if (operator === '+') {
    return res + current;
  } else {
    return res - current;
  }
}

function validExpression(exp) {
  const expression = exp.replace(/\s/g, '');
  const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')'];
  let parenthesesCount = 0;
  let operatorsCount = 0;
  let current;
  let index;
  if (['*', '/'].indexOf(expression.charAt(0)) > -1) {
    return false;
  }
  for (let i = 0; i < expression.length; i++) {
    current = expression.charAt(i);
    index = validChars.indexOf(current);
    if (index === -1) {
      return false;
    }
    if (current === '(') {
      if (i > 0 && ['+', '-', '*', '/', '('].indexOf(expression.charAt(i-1)) === -1) {
        return false;
      }
      if (i < expression.length - 1 && ['*', '/'].indexOf(expression.charAt(i+1)) > -1) {
        return false;
      }
      parenthesesCount++;
    } else if (current === ')') {
      if (i > 0 && ['+', '-', '*', '/', '('].indexOf(expression.charAt(i-1)) > -1) {
        return false;
      }
      if (i < expression.length - 1 && ['+', '-', '*', '/', ')'].indexOf(expression.charAt(i+1)) === -1) {
        return false;
      }
      parenthesesCount--;
    }
    if (['+', '-', '*', '/'].indexOf(current) > -1) {
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


function solver(exp) {
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
  if (['+', '-'].indexOf(expression[0]) > -1) {
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
        if (['+', '-', '*', '/'].indexOf(expression[i+1]) > -1) {
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
    if (['+', '-'].indexOf(tempOperator) > -1) {
      if (operator === '+') {
        res += current;
        operator = tempOperator;
        current = tempValue;
      } else {
        res -= current;
        operator = tempOperator;
        current = tempValue;
      }
    } else if (['*', '/'].indexOf(tempOperator) > -1) {
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

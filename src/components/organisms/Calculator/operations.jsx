const add = (addend1, addend2) => {
  return addend1 + addend2;
};

const divide = (divisor, quotient) => {
  if (quotient === 0) {
    alert("Division by zero is not allowed!");
    return "ERROR: Division by zero!";
  }
  return divisor / quotient;
};

const multiply = (factor1, factor2) => {
  return factor1 * factor2;
};

const powerOf = (base, exponent) => {
  return base ** exponent;
};

const square = (number) => {
  return number * number;
};

const squareRoot = (number) => {
  if (number < 0) {
    alert("Square root of negative number is not allowed!");
    return "ERROR! Square root of negative number.";
  }
  return Math.sqrt(number);
};

const substract = (minuend, subtrahend) => {
  return minuend - subtrahend;
};

export const operations = [
  { // Power of
    priority: 1,
    symbol: '\u005E',
    method: powerOf,
    neededValues: 2
  },
  { // Multiplication
    priority: 2,
    symbol: '*',
    method: multiply,
    neededValues: 2
  },
  { // Division
    priority: 3,
    symbol: '/',
    method: divide,
    neededValues: 2
  },
  { // Substraction
    priority: 4,
    symbol: '-',
    method: substract,
    neededValues: 2
  },
  { // Addition
    priority: 5,
    symbol: '+',
    method: add,
    neededValues: 2
  },
  { // Square
    priority: 6,
    symbol: '\u00B2',
    method: square,
    neededValues: 1
  },
  { // Square root
    priority: 7,
    symbol: '\u221A',
    method: squareRoot,
    neededValues: 1
  },
];

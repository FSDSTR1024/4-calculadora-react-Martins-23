import { useCallback, useEffect, useState } from "react";

import "./Calculator.css"
import { operations } from "./operations"
import { Display } from "../../atoms/Display"
import { Buttons } from "../../molecules/Buttons"

const sqRtSymbol = '\u221A';
const sqrSymbol = '\u00B2';

export const Calculator = ({ history, setHistory }) => {
  const [numbers, setNumbers] = useState(['0']);  // List of numbers inside the operation
  const [operators, setOperators] = useState([]);  // List of operators inside the operation
  const [wasOperatorClicked, setWasOperatorClicked] = useState(false);  // Flag to check if the last button clicked was an operator
  const [isResult, setIsResult] = useState(true);  // Flag to check if display is showing a result

  // Function to clear and set the initial state of the calculator
  const setInitialState = useCallback(() => {
    setNumbers(['0']);
    setOperators([]);
    setWasOperatorClicked(false);
    setIsResult(true);
  }, []);

  // Handling if a number button is clicked, to update the numbers' list
  const [numberClicked, setNumberClicked] = useState('');
  useEffect(() => {
    if (numberClicked.target === undefined) return;
    const number = numberClicked.target.textContent;
    if (isResult) setNumbers([number]);
    else if (wasOperatorClicked) setNumbers([...numbers, number]);
    else {
      const lastNumber = numbers[numbers.length - 1];
      const newNumber = lastNumber === '0' ? number : lastNumber + number;
      setNumbers([...numbers.slice(0, -1), newNumber]);
    }
    setWasOperatorClicked(false);
    setIsResult(false);
  }, [numberClicked]);

  // Handling if an operator button is clicked, to update the operators' list
  const [operatorClicked, setOperatorClicked] = useState('');
  useEffect(() => {
    if (operatorClicked.target === undefined) return;
    const operator = operatorClicked.target.textContent;
    if (wasOperatorClicked) setOperators([...operators.slice(0, -1), operator]);
    else setOperators([...operators, operator]);
    setWasOperatorClicked(true);
    setIsResult(false);
  }, [operatorClicked]);

  // Handling if a special operator button is clicked, to update the operators' list and calculate
  const [specialOperatorClicked, setSpecialOperatorClicked] = useState('');
  useEffect(() => {
    if (specialOperatorClicked.target === undefined) return;
    const specialOperator = specialOperatorClicked.target.textContent;
    setOperators([...operators, specialOperator]);
  }, [specialOperatorClicked]);

  // Handling if the delete button is clicked, to delete the last number or operator introduced
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  useEffect(() => {
    if (!deleteButtonClicked) return;
    if (wasOperatorClicked) {
      // The last introduced element was an operation
      setOperators(operators.slice(0, -1));
      setWasOperatorClicked(false);
    } else {
      // The last introduced element was a number
      const lastNumber = numbers[numbers.length - 1];
      // The last number had more than one digit
      if (lastNumber.length > 1) setNumbers([...numbers.slice(0, -1), lastNumber.slice(0, -1)]);
      // The last number had only one digit
      else {
        // The last introduced element was actually the first number introduced
        if (numbers.length === 1) {
          setNumbers(['0']);
          setIsResult(true);
        } else {
          setNumbers([...numbers.slice(0, -1)]);
          setWasOperatorClicked(true);
        }
      }
    }
    setDeleteButtonClicked(false);
  }, [deleteButtonClicked]);

  // Handling when the calculation (and log) is desired
  const [doCalculationAndLog, setDoCalculationAndLog] = useState(false);
  useEffect(() => {
    if (!doCalculationAndLog) return;
    let numbersCpy = [...numbers];
    let operatorsCpy = [...operators];
    const timestamp = new Date().toLocaleString();
    const operationStr = `${displayStr} =`;
    while (operatorsCpy.length > 0) {
      let operationIdx = -1;
      let operationObj = undefined;
      for (let operation of operations.sort((x, y) => x.priority - y.priority)) {
        operationIdx = operatorsCpy.indexOf(operation.symbol);
        if (operationIdx !== -1) {
          operationObj = operation;
          break;
        }
      }
      const numbersInvolved = numbersCpy.splice(operationIdx, operationObj.neededValues);
      const operationResult = operationObj.method(...numbersInvolved.map(parseFloat)).toString();
      if (operationResult.includes("ERROR")) {
        setInitialState();
        numbersCpy = [operationResult];
        break;
      }
      numbersCpy.splice(operationIdx, 0, operationResult);
      operatorsCpy.splice(operationIdx, 1);
    }
    const result = numbersCpy[0];
    setHistory([{ timestamp, operationStr, result }, ...history]);
    setInitialState();
    if (!numbersCpy[0].includes("ERROR")) setNumbers(numbersCpy);
    setIsResult(true);
    setDoCalculationAndLog(false);
  }, [doCalculationAndLog]);

  // Method to handle when a button is clicked
  const handleButtonClicked = useCallback((event) => {
    const buttonClass = event.target.className;
    if (buttonClass.includes("number")) setNumberClicked(event);
    else if (buttonClass.includes("operator")) setOperatorClicked(event);
    else if (buttonClass.includes("specialOperator")) setSpecialOperatorClicked(event);
    else if (buttonClass.includes("delete")) setDeleteButtonClicked(true);
    else {
      const buttonId = event.target.id;
      if (buttonId === "clear") setInitialState();
      else if (buttonId === "calculate") setDoCalculationAndLog(true);
    }
  }, []);

  // Handling of the operation display update
  const [displayStr, setDisplayStr] = useState('0');
  useEffect(() => {
    let newDisplayStr = '';
    const sqrtIdx = operators.indexOf(sqRtSymbol);
    const sqrIdx = operators.indexOf(sqrSymbol);
    if (sqrtIdx !== -1) {
      newDisplayStr += `${sqRtSymbol}(`;
    } else if (sqrIdx !== -1) {
      newDisplayStr += '(';
    }
    numbers.forEach((number, index) => {
      newDisplayStr += number;
      if ((index !== sqrtIdx && index !== sqrIdx) && operators[index]) newDisplayStr += operators[index];
    });
    if (sqrtIdx !== -1) {
      newDisplayStr += ')';
    } else if (sqrIdx !== -1) {
      newDisplayStr += `)${sqrSymbol}`;
    }
    setDisplayStr(newDisplayStr);
    setDoCalculationAndLog(sqrtIdx !== -1 || sqrIdx !== -1);
  }, [isResult, numbers, operators]);

  // Handling some buttons disablement
  const [areSpecialOperatorsDisabled, setAreSpecialOperatorsDisabled] = useState(false);
  const [isCalculateDisabled, setIsCalculateDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  useEffect(() => {
    setAreSpecialOperatorsDisabled(wasOperatorClicked);
    setIsCalculateDisabled(wasOperatorClicked);
    setIsDeleteDisabled(isResult || (numbers.length <= 1 && numbers[0] === "0" && operators.length === 0));
  }, [isResult, numbers, operators, wasOperatorClicked]);

  // Handling of the keydown event
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (key >= '0' && key <= '9') setNumberClicked({ target: { textContent: key } });
      else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '^') setOperatorClicked({ target: { textContent: key } });
      else if (key === 'Backspace') setDeleteButtonClicked(true);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="calculator">
      <Display displayStr={displayStr} />
      <Buttons
        areSpecialOperatorsDisabled={areSpecialOperatorsDisabled}
        handleButtonClicked={handleButtonClicked}
        isCalculateDisabled={isCalculateDisabled}
        isDeleteDisabled={isDeleteDisabled}
      />
    </section>
  );
};

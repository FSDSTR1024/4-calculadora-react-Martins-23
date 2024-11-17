import { useEffect, useState } from "react";

import "./Calculator.css"
import { Display } from "../../atoms/Display"
import { Buttons } from "../../molecules/Buttons"

export const Calculator = () => {
  // List of numbers inside the operation
  const [numbers, setNumbers] = useState(['0']);
  // List of operators inside the operation
  const [operators, setOperators] = useState([]);
  // Flag to check if the last button clicked was an operator
  const [wasOperatorClicked, setWasOperatorClicked] = useState(false);

  // String to display the operation
  const [displayStr, setdisplayStr] = useState('0');

  const setInitialState = () => {
    setNumbers(['0']);
    setOperators([]);
    setWasOperatorClicked(false);
  };

  // UseEffect to update the displayStr when numbers or operators lists change
  useEffect(() => {
    let newDisplayStr = '';
    numbers.forEach((number, index) => {
      newDisplayStr += number;
      if (operators[index]) newDisplayStr += ` ${operators[index]} `;
    });
    setdisplayStr(newDisplayStr);
  }, [numbers, operators]);

  // Method to handle the delete button
  const handleDeleteButton = () => {
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
        if (numbers.length === 1) setNumbers(['0']);
        else {
          setNumbers([...numbers.slice(0, -1)]);
          setWasOperatorClicked(true);
        }
      }
    }
  };

  // Method to calculate the operation
  const calculate = () => {
  };

  // Method to handle when a number is clicked, to update the numbers list
  const handleNumberClicked = (number) => {
    if (wasOperatorClicked) setNumbers([...numbers, number]);
    else {
      const lastNumber = numbers[numbers.length - 1];
      const newNumber = lastNumber === '0' ? number : lastNumber + number;
      setNumbers([...numbers.slice(0, -1), newNumber]);
    }
    setWasOperatorClicked(false);
  };

  // Method to handle when an operator is clicked, to update the operators list
  const handleOperatorClicked = (operator) => {
    if (wasOperatorClicked) setOperators([...operators.slice(0, -1), operator]);
    else setOperators([...operators, operator]);
    setWasOperatorClicked(true);
  };

  // Method to handle when a button is clicked, to update the operation and calculator's lists
  const handleButtonClicked = (event) => {
    const buttonClass = event.target.className;
    if (buttonClass.includes("number")) handleNumberClicked(event.target.textContent);
    else if (buttonClass.includes("operator")) handleOperatorClicked(event.target.textContent);
    else {
      const buttonId = event.target.id;
      if (buttonId === "clear") setInitialState();
      else if (buttonId === "delete") handleDeleteButton();
      else if (buttonId === "calculate") calculate();
    }
  };

  // Handle disabling of some buttons
  const [isCalculateDisabled, setIsCalculateDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  useEffect(() => {
    setIsCalculateDisabled(wasOperatorClicked);
    setIsDeleteDisabled((numbers.length <= 1 && numbers[0] === '0') && operators.length === 0);
  }, [numbers, operators, wasOperatorClicked]);

  return (
    <section id="calculator">
      <Display displayStr={displayStr} />
      <Buttons
        handleButtonClicked={handleButtonClicked}
        isCalculateDisabled={isCalculateDisabled}
        isDeleteDisabled={isDeleteDisabled}
      />
    </section>
  );
};

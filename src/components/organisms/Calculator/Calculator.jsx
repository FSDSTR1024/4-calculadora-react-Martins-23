import { useEffect, useState } from "react";

import "./Calculator.css"
import { Display } from "../../atoms/Display"
import { Buttons } from "../../molecules/Buttons"

export const Calculator = () => {
  // List of numbers inside the operation
  const [numbers, setNumbers] = useState(['0']);
  // Flag to check if the last button clicked was an operator
  const [wasOperatorClicked, setWasOperatorClicked] = useState(false);

  // String to display the operation
  const [displayStr, setdisplayStr] = useState('0');

  // UseEffect to update the displayStr when numbers list changes
  useEffect(() => {
    let newDisplayStr = '';
    numbers.forEach((number, index) => {
      newDisplayStr += number;
    });
    setdisplayStr(newDisplayStr);
}, [numbers]);

  // Method to handle when a number is clicked, to update the numbers list
  const handleNumberClicked = (number) => {
    if (wasOperatorClicked) setNumbers([...numbers, number]);
    else {
      const lastNumber = numbers[numbers.length - 1];
      const newNumber = lastNumber === '0' ? number : lastNumber + number;
      setNumbers([...numbers.slice(0, -1), newNumber]);
    }
    setWasOperatorClicked(false);
  }

  // Method to handle when a button is clicked, to update the operation and calculator's lists
  const handleButtonClicked = (event) => {
    const buttonClass = event.target.className;
    if (buttonClass.includes("number")) handleNumberClicked(event.target.textContent);
  }

  return (
    <section id="calculator">
      <Display displayStr={displayStr}/>
      <Buttons handleButtonClicked={handleButtonClicked}/>
    </section>
)};

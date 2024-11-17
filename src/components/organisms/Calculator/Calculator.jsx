import { useEffect, useState } from "react";

import "./Calculator.css"
import { Display } from "../../atoms/Display"
import { Buttons } from "../../molecules/Buttons"

export const Calculator = () => {
  const [numbers, setNumbers] = useState(['0']);
  const [wasOperatorClicked, setWasOperatorClicked] = useState(false);

  const [displayStr, setdisplayStr] = useState('0');

  useEffect(() => {
    let newDisplayStr = '';
    numbers.forEach((number, index) => {
      newDisplayStr += number;
    });
    setdisplayStr(newDisplayStr);
}, [numbers]);

  const handleNumberClicked = (number) => {
    if (wasOperatorClicked) setNumbers([...numbers, number]);
    else {
      const lastNumber = numbers[numbers.length - 1];
      const newNumber = lastNumber === '0' ? number : lastNumber + number;
      setNumbers([...numbers.slice(0, -1), newNumber]);
    }
    setWasOperatorClicked(false);
  }

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

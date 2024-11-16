import "./Buttons.css"
import { Button } from "../../atoms/Button"

export const Buttons = () => (
  <div id="buttons">
    <Button className="specialOperation" content="&#8730;" />
    <Button className="specialOperation" content="&sup2;" />
    <Button className="operation" content="&#94;" />
    <Button className="operation" content="/" />
    <Button className="number" content="7" />
    <Button className="number" content="8" />
    <Button className="number" content="9" />
    <Button className="operation" content="*" />
    <Button className="number" content="4" />
    <Button className="number" content="5" />
    <Button className="number" content="6" />
    <Button className="operation" content="-" />
    <Button className="number" content="1" />
    <Button className="number" content="2" />
    <Button className="number" content="3" />
    <Button className="operation" content="+" />
    <Button id="clear" content="C" />
    <Button className="number" content="0" />
    <Button id="delete">
      <img src="../../../assets/backspace_symbol.png" alt="Delete button" />
    </Button>
    <Button id="calculate" content="=" />
  </div>
);

import "./Buttons.css"
import { Button } from "../../atoms/Button"

export const Buttons = ({ handleButtonClicked }) => (
  <div id="buttons">
    <Button className="specialOperation" content="&#8730;" handleButtonClicked={handleButtonClicked} />
    <Button className="specialOperation" content="&sup2;" handleButtonClicked={handleButtonClicked} />
    <Button className="operation" content="&#94;" handleButtonClicked={handleButtonClicked} />
    <Button className="operation" content="/" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="7" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="8" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="9" handleButtonClicked={handleButtonClicked} />
    <Button className="operation" content="*" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="4" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="5" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="6" handleButtonClicked={handleButtonClicked} />
    <Button className="operation" content="-" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="1" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="2" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="3" handleButtonClicked={handleButtonClicked} />
    <Button className="operation" content="+" handleButtonClicked={handleButtonClicked} />
    <Button id="clear" content="C" handleButtonClicked={handleButtonClicked} />
    <Button className="number" content="0" handleButtonClicked={handleButtonClicked} />
    <Button id="delete">
      <img src="../../../assets/backspace_symbol.png" alt="Delete button" />
    </Button>
    <Button id="calculate" content="=" handleButtonClicked={handleButtonClicked} />
  </div>
);

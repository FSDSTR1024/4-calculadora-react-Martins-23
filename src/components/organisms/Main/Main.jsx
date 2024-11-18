import { useState } from "react"

import "./Main.css"
import { Calculator } from "../Calculator"
import { History } from "../History"

export const Main = () => {
  const [history, setHistory] = useState([]);

  return (
    <main>
      <Calculator history={history} setHistory={setHistory} />
      <History history={history} />
    </main>
  );
};

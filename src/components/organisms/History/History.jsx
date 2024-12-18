import "./History.css"
import { HistoryList } from "../../molecules/HistoryList"

export const History = ({ history }) => (
  <section id="history">
    <h2>History</h2>
    <HistoryList history={history} />
  </section>
);

import "./HistoryList.css"
import { HistoryListItem } from "../../atoms/HistoryListItem"

export const HistoryList = ({ history }) => (
  <ul id="historyList">
    {history.map((entry, index) => (
      <HistoryListItem
        key={index}
        operationStr={entry.operationStr}
        result={entry.result}
        timestamp={entry.timestamp}
      />
    ))}
  </ul>
);

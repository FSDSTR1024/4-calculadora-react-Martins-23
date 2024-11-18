import "./HistoryListItem.css"

export const HistoryListItem = ({ operationStr, result, timestamp }) => {
  const resultStatus = result.includes("ERROR") ? "error" : "correct";
  const operationResultClassStr = `operationResult ${resultStatus}`;
  return (
    <li>
      <div>
        <p className="timestamp">{timestamp}</p>
        <p className="operationStr">{operationStr}</p>
        <p className={operationResultClassStr}>{result}</p>
      </div>
    </li>
  );
};

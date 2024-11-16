import "./HistoryListItem.css"

export const HistoryListItem = ({ timestamp, operationStr, operationResultStatus, operationResultContent }) => {
  const operationResultClassStr = `operationResult ${operationResultStatus}`;
  return (
    <li>
      <div>
        <p className="timestamp">{timestamp}</p>
        <p className="operationStr">{operationStr}</p>
        <p className={operationResultClassStr}>{operationResultContent}</p>
      </div>
    </li>
)};

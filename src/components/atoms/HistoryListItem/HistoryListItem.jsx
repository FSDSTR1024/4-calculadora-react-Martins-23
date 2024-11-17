import "./HistoryListItem.css"

export const HistoryListItem = ({
  operationResultContent,
  operationResultStatus,
  operationStr,
  timestamp
}) => {
  const operationResultClassStr = `operationResult ${operationResultStatus}`;
  return (
    <li>
      <div>
        <p className="timestamp">{timestamp}</p>
        <p className="operationStr">{operationStr}</p>
        <p className={operationResultClassStr}>{operationResultContent}</p>
      </div>
    </li>
  );
};

import "./Button.css"

export const Button = ({
  children,
  handleButtonClicked,
  className = undefined,
  content = undefined,
  disabled = false,
  id = undefined
}) => {
  if (id !== undefined && content !== undefined) {
    return (
      <button
        disabled={disabled}
        id={id}
        onClick={handleButtonClicked}
        type="button"
      >
        {content}
      </button>
    );
  } else if (className !== undefined && children !== undefined) {
    return (
      <button
        className={className}
        disabled={disabled}
        onClick={handleButtonClicked}
        type="button"
      >
        {children}
      </button>
    );
  } else if (className !== undefined) {
    return (
      <button
        className={className}
        disabled={disabled}
        onClick={handleButtonClicked}
        type="button"
      >
        {content}
      </button>
    );
  }
};

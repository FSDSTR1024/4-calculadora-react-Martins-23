import "./Button.css"

export const Button = ({ children, handleButtonClicked, content=undefined, id=undefined, className=undefined }) => {
  if (id !== undefined && content !== undefined) {
    return (
      <button id={id} type="button" onClick={handleButtonClicked}>{content}</button>
    );
  } else if (id !== undefined && children) {
    return (
      <button id={id} type="button" onClick={handleButtonClicked}>{children}</button>
    );
  } else if (className !== undefined) {
    return (
      <button className={className} type="button" onClick={handleButtonClicked}>{content}</button>
    );
  }
}

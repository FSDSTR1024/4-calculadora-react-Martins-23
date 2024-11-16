import "./Button.css"

export const Button = ({ children, content=undefined, id=undefined, className=undefined }) => {
  if (id !== undefined && content !== undefined) {
    return (
      <button id={id} type="button">{content}</button>
    );
  } else if (id !== undefined && children) {
    return (
      <button id={id} type="button">{children}</button>
    );
  } else if (className !== undefined) {
    return (
      <button className={className} type="button">{content}</button>
    );
  }
}

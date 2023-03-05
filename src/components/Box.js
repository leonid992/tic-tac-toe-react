import "./Box.css";

const Box = (props) => {
  const buttonClass = `box ${props.class}`;
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default Box;

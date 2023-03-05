import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.bn39} onClick={props.onClick}>
      <span className={classes.bn39span}>{props.name}</span>
    </button>
  );
};

export default Button;

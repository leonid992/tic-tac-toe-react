import classes from "./Container.module.css";

const Container = (props) => {
  return <div className={classes[props.class]}>{props.children}</div>;
};

export default Container;

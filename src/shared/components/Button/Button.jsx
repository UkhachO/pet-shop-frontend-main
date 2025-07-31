import styles from "./Button.module.css";
import clsx from "clsx";
const Button = ({
  children,
  variant = "primary",
  to,
  onClick,
  className,
  ...rest
}) => {
  const classNames = clsx(styles.button, styles[variant], className);

  if (to) {
    return (
      <a href={to} className={classNames} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;

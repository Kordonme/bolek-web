import classNames from "classnames";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const CardSpacing = ({ className, ...props }: Props) => {
  const classes = classNames("p-6", className)
  return <div className={classes} {...props} />;
};

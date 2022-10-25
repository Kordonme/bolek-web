import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  spacing?: boolean;
}>;

export const Card = ({ spacing = true, ...props }: Props) => {
  const classes = classNames("overflow-hidden rounded-lg border border-slate-200 shadow", spacing && "p-6")
  return (
    <div className={classes} {...props} />
  );
};

import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Badge = ({ children }: Props) => {
  const classes = classNames(
    "bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 flex items-center"
  );

  return <span className={classes}>{children}</span>;
};

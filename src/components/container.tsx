import classnames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const Container = (props: Props) => {
  const { className, ...rest } = props;

  const classes = classnames(
    "w-full 2xl:container md:mx-auto px-6",
    props.className
  );

  return <div className={classes} {...rest} />;
};

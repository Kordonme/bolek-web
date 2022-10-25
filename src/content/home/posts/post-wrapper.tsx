import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  avatar: ReactNode;
  className?: string;
  showLine: boolean;
}> &
  HTMLAttributes<HTMLDivElement>;

export const PostWrapper = ({
  children,
  avatar,
  className,
  showLine,
  ...props
}: Props) => {
  const classes = classNames("flex gap-4 flex-1", className);

  return (
    <div className={classes} {...props}>
      <div className="flex flex-col items-center">
        {avatar}
        {showLine && <div className="mt-3 h-full border-r"></div>}
      </div>
      {children}
    </div>
  );
};

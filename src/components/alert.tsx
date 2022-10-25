import { PropsWithChildren, ReactNode } from "react";

type AlertVariant = "success";

type Props = PropsWithChildren<{
  type?: AlertVariant;
  icon?: ReactNode;
}>;

export const Alert = ({ children, icon, type = "success" }: Props) => {
  return (
    <div
      className="mb-4 flex rounded-lg bg-blue-100 p-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
      role="alert"
    >
      {icon && <div className="mr-3 inline h-5 w-5 flex-shrink-0">{icon}</div>}
      <div>{children}</div>
    </div>
  );
};

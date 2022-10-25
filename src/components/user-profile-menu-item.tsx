import MenuItemUnstyled from "@mui/base/MenuItemUnstyled";
import { TablerIcon } from "@tabler/icons";
import {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from "react";

interface Props<T extends ElementType> {
  divider?: boolean;
  as?: T;
  children?: ReactNode;
  icon: TablerIcon;
}

const UserProfileMenuItem = forwardRef(
  <T extends ElementType = "button">(
    {
      children,
      divider = false,
      as,
      ref,
      icon: Icon,
      ...props
    }: Props<T> & Omit<ComponentPropsWithRef<T>, keyof Props<T>>,
    _ref: ForwardedRef<HTMLDivElement>
  ) => {
    const Component = as || "button";

    return divider ? (
      <hr className="my-1 block h-px border-0 bg-gray-200 dark:bg-slate-700" />
    ) : (
      <MenuItemUnstyled>
        <Component
          {...props}
          ref={ref}
          className="flex w-full items-center px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {Icon && (
            <div className="mr-2">
              <Icon size={18} />
            </div>
          )}
          {children}
        </Component>
      </MenuItemUnstyled>
    );
  }
);

UserProfileMenuItem.displayName = "UserProfileMenuItem";

export { UserProfileMenuItem };

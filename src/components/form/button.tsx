import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { IconLoader2 } from "@tabler/icons";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, useMemo } from "react";
import {
  ButtonSize,
  ButtonSizes,
  ButtonVariant,
  ButtonVariants,
} from "../../utils/types/button";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};
type AnchorProps = Omit<LinkProps, "href"> & {
  href?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type CommonProps = {
  size?: ButtonSizes;
  variant?: ButtonVariants;
  link?: boolean;
  unstyled?: boolean;
  loading?: boolean;
};

type Props = (ButtonProps | AnchorProps) & CommonProps;

export const Button = ({
  size = "md",
  variant = "primary",
  link,
  unstyled,
  loading = false,
  children,
  ...props
}: Props) => {
  const isButton = !link && !unstyled;
  const buttonProps = props as ButtonProps;
  const disabled = buttonProps.disabled || loading;

  const classes = classNames(
    isButton && "flex justify-center items-center gap-2 rounded",
    isButton && ButtonVariant[variant],
    isButton && ButtonSize[size],
    link && "text-slate-900 underline",
    disabled && "disabled cursor-not-allowed",
    props.className
  );

  const content = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        {loading && <IconLoader2 className="animate-spin" />}
        {children}
      </div>
    );
  }, [loading, children]);

  if (props.href) {
    const {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      ...rest
    } = props;

    const linkProps = {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
    };

    return (
      <Link {...linkProps}>
        <a {...(rest as AnchorProps)} className={classes}>
          {content}
        </a>
      </Link>
    );
  }

  return (
    <ButtonUnstyled {...buttonProps} disabled={disabled} className={classes}>
      {content}
    </ButtonUnstyled>
  );
};

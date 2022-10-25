import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import classNames from "classnames";
import { forwardRef, useId } from "react";
import { TextareaAutosizeWrapper } from "./internal/textarea-autosize-wrapper";

type InputSize = "normal" | "large";

type Props = InputUnstyledProps & {
  label?: string;
  variant?: InputSize;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, id, variant = "normal", className, errorMessage, ...props },
    ref
  ) => {
    const randomId = useId();
    const inputId = id ?? randomId;

    const inputClasses = classNames(
      "block w-full rounded border px-2 focus:ring-2 focus:ring-slate-300 ring-offset-1 outline-none hover:border-slate-400 focus:border-slate-400 transition-all placeholder:text-gray-400",
      className,
      variant === "normal" && "h-10 text-md",
      variant === "large" && "h-14 text-lg",
      errorMessage && "border-rose-700 bg-rose-50"
    );

    return (
      <div>
        <div className="space-y-2">
          {label && (
            <label className="font-medium" htmlFor={inputId}>
              {label}
            </label>
          )}
          <InputUnstyled
            ref={ref}
            slots={{
              textarea: TextareaAutosizeWrapper,
            }}
            slotProps={{
              input: {
                id: inputId,
                className: inputClasses,
              },
            }}
            {...props}
          />
        </div>
        {errorMessage && (
          <div className="mt-1 text-sm text-rose-700">{errorMessage}</div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

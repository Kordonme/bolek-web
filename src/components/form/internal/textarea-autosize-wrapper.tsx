import {
  InputUnstyledOwnerState,
  TextareaAutosize,
  TextareaAutosizeProps,
} from "@mui/base";
import { forwardRef } from "react";

type Props = TextareaAutosizeProps & {
  ownerState: InputUnstyledOwnerState;
};

const TextareaAutosizeWrapper = forwardRef<HTMLTextAreaElement, Props>(
  ({ ownerState, ...props }, ref) => {
    return <TextareaAutosize {...props} ref={ref} />;
  }
);

TextareaAutosizeWrapper.displayName = "TextareaAutosizeWrapper";

export { TextareaAutosizeWrapper };

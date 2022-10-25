import classNames from "classnames";
import { getInitials, stringToColor } from "../utils/avatar";
import { AvatarSize, AvatarSizes } from "../utils/types/avatar";

type Props = {
  name: string;
  size?: AvatarSizes;
};

export const Avatar = ({ name, size = "md" }: Props) => {
  const initials = getInitials(name);
  const color = stringToColor(name);

  const classes = classNames(
    "flex-shrink-0 inline-flex h-12 w-12 select-none items-center justify-center rounded-full text-white",
    AvatarSize[size]
  );

  return (
    <div className={classes} style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
};

import { Sizes } from ".";

export type AvatarSizes = Extract<Sizes, "sm" | "md" | "lg">;

export const AvatarSize: {
  [K in AvatarSizes]: string;
} = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-md",
  lg: "h-12 w-12 text-lg"
}
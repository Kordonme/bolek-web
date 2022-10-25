import { Sizes, Variants } from ".";

export type ButtonSizes = Extract<Sizes, "sm" | "md" | "lg">;

export type ButtonVariants = Extract<Variants, "primary" | "secondary">;

export const ButtonSize: {
  [K in ButtonSizes]: string;
} = {
  sm: "h-7 px-2 text-sm",
  md: "h-9 px-4 text-md",
  lg: "h-12 px-6 text-lg",
};

export const ButtonVariant: {
  [K in ButtonVariants]: string;
} = {
  primary: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-700",
  secondary: "bg-white border border-slate-900 hover:bg-slate-100",
};

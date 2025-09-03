import type { HTMLAttributes, ReactNode } from "react";

type TextProps = {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Text({
  as = "p",
  children,
  className = "",
  ...props
}: TextProps) {
  const Component = as || "p";
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

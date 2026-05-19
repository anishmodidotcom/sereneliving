import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-[1400px]",
  narrow: "max-w-[920px]",
  wide: "max-w-[1600px]",
};

export function Container({
  size = "default",
  as: Tag = "div",
  className,
  ...rest
}: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 md:px-12",
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
}

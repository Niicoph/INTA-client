import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children?: ReactNode;
}

const containerVariants = cva("border border-border rounded-lg", {
  variants: {
    variant: {
      default: "bg-background/50 dark:bg-background/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Use this component to wrap your content in a container.
 * @param className
 * @param variant
 * @param children
 * @returns <div>
 */
export default function Container({
  className,
  variant,
  children,
}: ContainerProps & VariantProps<typeof containerVariants>) {
  return (
    <div className={containerVariants({ variant, className })}>{children}</div>
  );
}

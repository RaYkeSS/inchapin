import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

import styles from "./button.module.scss";

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.variantPrimary,
      secondary: styles.variantSecondary,
      link: styles.variantLink,
    },
    size: {
      xl: styles.sizeXl,
      md: styles.sizeMd,
    },
  },
});

const Button = <T extends ElementType = "button">({
  as,
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps<T> & VariantProps<typeof buttonVariants>) => {
  const Component = as ?? "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Button };

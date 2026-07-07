import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

import styles from "./text.module.scss";

type TextProps<T extends ElementType = "span"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const textVariants = cva(styles.text, {
  variants: {
    color: {
      accent: styles.colorAccent,
      muted: styles.colorMuted,
    },
    size: {
      tagline: styles.sizeTagline,
      caption: styles.sizeCaption,
      paragraph: styles.sizeParagraph,
      description: styles.sizeDescription,
    },
  },
});

const Text = <T extends ElementType = "span">({
                                                as,
                                                children,
                                                className,
                                                color,
                                                size,
                                                ...props
                                              }: TextProps<T> & VariantProps<typeof textVariants>) => {
  const Component = as ?? "span";

  return (
    <Component
      className={cn(textVariants({ color, size }), className)}
  {...props}
>
  {children}
  </Component>
);
};

export { Text };

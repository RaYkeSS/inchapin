import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import styles from "./input.module.scss";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "placeholder"> & {
  label: string;
  className?: string;
  containerClassName?: string;
};

const Input = ({
  label,
  id,
  className,
  containerClassName,
  ...props
}: InputProps) => {
  return (
    <div className={clsx(styles.field, containerClassName)}>
      <input
        id={id}
        className={clsx(styles.input, className)}
        placeholder=""
        {...props}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export { Input };

"use client";

import { useId, useMemo } from "react";

import ReactSelect, {
  type ClassNamesConfig,
  type GroupBase,
  type Props,
} from "react-select";

import { cn } from "~/lib/utils";

import styles from "./select.module.scss";

type SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<Props<Option, IsMulti, Group>, "styles" | "unstyled" | "classNames"> & {
  className?: string;
};

function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ className, instanceId, ...props }: SelectProps<Option, IsMulti, Group>) {
  // Stable SSR-safe id — react-select derives all internal ids from it, so
  // they match between server and client (no hydration mismatch).
  const reactId = useId();

  // `unstyled` strips built-in styles; all appearance lives in the SCSS module
  // (rules scoped under `.wrap` to outrank react-select's leftover emotion
  // classes). No inline visual values anywhere.
  const selectClassNames = useMemo<ClassNamesConfig<Option, IsMulti, Group>>(
    () => ({
      container: () => styles.container,
      control: (state) =>
        cn(
          styles.control,
          (state.isFocused || state.selectProps.menuIsOpen) && styles.controlActive,
        ),
      valueContainer: () => styles.valueContainer,
      placeholder: () => styles.placeholder,
      singleValue: () => styles.singleValue,
      input: () => styles.input,
      indicatorsContainer: () => styles.indicatorsContainer,
      indicatorSeparator: () => styles.indicatorSeparator,
      dropdownIndicator: (state) =>
        cn(
          styles.dropdownIndicator,
          state.selectProps.menuIsOpen && styles.dropdownIndicatorOpen,
        ),
      clearIndicator: () => styles.clearIndicator,
      menu: () => styles.menu,
      menuList: () => styles.menuList,
      option: (state) =>
        cn(
          styles.option,
          state.isFocused && styles.optionFocused,
          state.isSelected && styles.optionSelected,
        ),
    }),
    [],
  );

  return (
    <div className={cn(styles.wrap, className)}>
      <ReactSelect
        {...props}
        instanceId={instanceId ?? reactId}
        unstyled
        classNames={selectClassNames}
      />
    </div>
  );
}

export { Select };

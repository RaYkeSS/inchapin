"use client";

import { useId, useMemo } from "react";

import ReactSelect, {
  type ClassNamesConfig,
  type GroupBase,
  type PlaceholderProps,
  type Props,
} from "react-select";

import { cn } from "~/lib/utils";

import styles from "./select.module.scss";

function Placeholder<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({ children, innerProps }: PlaceholderProps<Option, IsMulti, Group>) {
  return (
    <div {...innerProps} className={styles.animationCnt}>
      <div data-text={children} className={styles.animationTop}>
        {children}
      </div>
    </div>
  );
}

type SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<
  Props<Option, IsMulti, Group>,
  "styles" | "unstyled" | "classNames"
> & {
  className?: string;
};

function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ className, instanceId, ...props }: SelectProps<Option, IsMulti, Group>) {
  const reactId = useId();

  const selectClassNames = useMemo<ClassNamesConfig<Option, IsMulti, Group>>(
    () => ({
      container: () => styles.container,
      control: (state) =>
        cn(
          styles.control,
          (state.isFocused || state.selectProps.menuIsOpen) &&
            styles.controlActive,
        ),
      valueContainer: () => styles.valueContainer,
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
        components={{ Placeholder }}
      />
    </div>
  );
}

export { Select };

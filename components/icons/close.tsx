import type { FC } from "react";

import { IconProps } from "./icon.types";

const Close: FC<IconProps> = ({
  size = 27,
  color = "currentColor",
  className = "",
}) => {
  const normalizedSize = typeof size === "number" ? `${size}px` : size;

  return (
    <svg
      className={className}
      width={normalizedSize}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.5 0.5L0.500415 26.4996"
        stroke={color}
        strokeLinecap="round"
      />
      <path d="M0.5 0.5L26.4996 26.4996" stroke={color} strokeLinecap="round" />
    </svg>
  );
};

export default Close;

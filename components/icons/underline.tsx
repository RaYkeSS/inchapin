import type { FC } from "react";

import { IconProps } from "./icon.types";

const Underline: FC<IconProps> = ({
  size = 63,
  color = "currentColor",
  className = "",
}) => {
  const normalizedSize = typeof size === "number" ? `${size}px` : size;

  return (
    <svg
      className={className}
      width={normalizedSize}
      viewBox="0 0 63 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61.2135 0C62.1593 0 63 0.880734 63 1.87156V10.1284C63 11.1193 62.1593 12 61.2135 12H1.78649C0.840697 12 0 11.1193 0 10.1284V1.87156C0 0.880734 0.840697 0 1.78649 0H61.2135V0Z"
        fill={color}
      />
    </svg>
  );
};

export default Underline;

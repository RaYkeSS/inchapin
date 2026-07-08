import type { FC } from "react";

import { IconProps } from "./icon.types";

const Play: FC<IconProps> = ({
  size = 12,
  color = "currentColor",
  className = "",
}) => {
  const normalizedSize = typeof size === "number" ? `${size}px` : size;

  return (
    <svg
      className={className}
      width={normalizedSize}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8849 4.99001C11.7919 5.4784 11.7919 6.77941 10.8849 7.2678L1.90675 12.1022C1.04498 12.5662 5.56253e-08 11.9421 1.01498e-07 10.9633L5.54658e-07 1.29451C6.0053e-07 0.315751 1.04498 -0.308411 1.90676 0.15562L10.8849 4.99001Z"
        fill={color}
      />
    </svg>
  );
};

export default Play;

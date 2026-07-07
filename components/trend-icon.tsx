import React from "react";

type TrendIconProps = {
  direction: "up" | "down";
};

const TrendIcon = ({ direction }: TrendIconProps) => {
  const color = direction === "up" ? "text-green-500" : "text-red-500";
  return (
    <svg
      aria-hidden="true"
      className={`${color} w-4 h-4`}
      width="16"
      height="16"
    >
      <polygon
        points={direction === "up" ? "8,3 2,13 14,13" : "8,13 2,3 14,3"}
        fill="currentColor"
      />
    </svg>
  );
};

export default TrendIcon;

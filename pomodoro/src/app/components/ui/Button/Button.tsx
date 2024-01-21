import React, { FC } from "react";
import { ButtonProps } from "./Button.types";

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type,
  className,
}) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

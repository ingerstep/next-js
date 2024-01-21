import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
  }
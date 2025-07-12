import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: React.ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  const baseClasses =
    "py-[10px] px-[20px] inline-flex justify-center items-center gap-3 cursor-pointer font-[500]";

  const classes = `${baseClasses} ${className ?? ""}`.trim();

  return (
    <button
      {...props}
      className={classes}>
      {children}
    </button>
  );
}

"use client";

import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}

export default function LinkButton({
  href,
  target,
  children,
  className
}: LinkButtonProps) {
  const baseClasses =
    "py-[10px] px-[20px] inline-flex items-center gap-3 cursor-pointer font-[500]";

  const classes = `${baseClasses} ${className ?? ""}`.trim();

  return (
    <Link
      href={href}
      target={target}
      className={classes}>
      {children}
    </Link>
  );
}

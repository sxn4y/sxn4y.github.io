"use client";

import React, { ReactNode, useEffect } from "react";
import "./epsilon.css";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  parallax?: boolean;
  tiltFactor?: number;

  autoFocus?: boolean;
  command?: string;
  commandFor?: string;
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;

  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "positive"
    | "danger"
    | "link"
    | "fancy";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "w-fit h-[100px]",
  parallax = false,
  tiltFactor = 20,

  autoFocus = false,
  disabled = false,
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate = false,
  formTarget,
  name,
  type = "button",
  value,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,

  variant = "primary",
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isTouchDevice = () => {
    if (typeof window !== "undefined") {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    return false;
  };

  if (isTouchDevice()) {
    tiltFactor = 0;
  }

  let inBuiltClass =
    "px-3 py-1.5 rounded-(--s2)  text-(--background) bg-(--foreground) outline-(--foreground)/50 outline-0 delay-25 transition-[outline] transition-[background] hover:bg-(--foreground)/90 focus:outline-3";

  switch (variant) {
    case "secondary":
      inBuiltClass =
        "px-3 py-1.5 rounded-(--s2) text-(--foreground) bg-(--foreground)/10 outline-(--foreground)/5 outline-0 delay-25 transition-[outline] transition-[background] hover:bg-(--foreground)/9 focus:outline-3";
      break;
    case "outline":
      inBuiltClass =
        "px-3 py-1.5 rounded-(--s2) text-(--foreground) border border-(--foreground)/20 bg-(--foreground)/10 outline-(--foreground)/7 outline-0 delay-25 transition-[outline] transition-[background] hover:bg-(--foreground)/9 focus:outline-3";
      break;
    case "positive":
      inBuiltClass =
        "px-3 py-1.5 rounded-(--s2) text-(--foreground) bg-blue-500 dark:bg-blue-800 outline-blue-500/50 dark:outline-blue-800/50 outline-0 delay-25 transition-[outline] transition-[background] hover:bg-blue-500/90 dark:hover:bg-blue-800/90 focus:outline-3";
      break;
    case "danger":
      inBuiltClass =
        "px-3 py-1.5 rounded-(--s2) text-(--foreground) bg-red-500 dark:bg-red-800 outline-red-500/50 dark:outline-red-800/50 outline-0 delay-25 transition-[outline] transition-[background] hover:bg-red-500/90 dark:hover:bg-red-800/90 focus:outline-3";
      break;
    case "link":
      inBuiltClass =
        "px-3 py-1.5 rounded-(--s2) text-(--foreground) outline-0 delay-25 transition-[background] transition-[text-decoration] underline-offset-4 hover:underline hover:shadow-lg/20";
      break;
    case "fancy":
      inBuiltClass =
        "px-3 py-1.5 rounded-(--s2) text-(--foreground) border border-(--foreground)/20 bg-linear-to-b from-(--foreground)/10 to-(--foreground)/6 outline-(--foreground)/7 outline-0 delay-25 transition-[outline] transition-[background] hover:bg-(--foreground)/2 focus:outline-3";
      break;
  }

  useEffect(() => {
    const button = buttonRef.current;
    let handleMouseMove = (e: MouseEvent) => {},
      handleMouseLeave = () => {};

    if (!button) return;

    if (parallax) {
      handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / (button.clientHeight / tiltFactor);
        const tiltY = (centerX - x) / (button.clientWidth / tiltFactor);

        button.style.setProperty("--x", `${x}%`);
        button.style.setProperty("--y", `${y}%`);
        button.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      };

      handleMouseLeave = () => {
        button.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      };

      button.addEventListener("mousemove", handleMouseMove);

      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <button
      autoFocus={autoFocus}
      disabled={disabled}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      name={name}
      type={type}
      value={value}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      className={`${
        parallax ? "glow-effect" : "no-glow-effect"
      } ${inBuiltClass} h-fit font-medium text-(length:--s3) overflow-hidden ${className}`}
      ref={buttonRef}
    >
      {children}
      <div className="glow-container" />
    </button>
  );
};

export default Button;

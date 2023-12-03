import React from "react";

const Button = ({
  className,
  children,
  label,
  type = "button",
  variant = "primary",
  size = "sm",
  onClick,
  isDisabled,
  ...rest
}) => {
  const variantStyle =
    variant == "primary"
      ? "bg-blue-400 "
      : variant == "secondary"
      ? "bg-blue-600"
      : variant == "tertiary"
      ? "bg-blue-800"
      : variant == "skeleton"
      ? "animate-pulse space-x-4 bg-slate-700 "
      : "";
  const sizeStyle =
    size == "sm"
      ? "px-10 py-1"
      : size == "md"
      ? "px-20 py-2"
      : size == "lg"
      ? "px-40 py-5"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`block rounded-full text-white disabled:cursor-not-allowed disabled:opacity-60 ${className} ${variantStyle} ${sizeStyle}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;

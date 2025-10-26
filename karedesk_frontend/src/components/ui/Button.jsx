import React from "react";
import PropTypes from "prop-types";

/**
 * Button component with Ocean Professional styling and subtle animations.
 * Supports variants: primary, outline, ghost; sizes: sm, md, lg.
 * Accessible with keyboard focus and aria attributes.
 */
// PUBLIC_INTERFACE
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  href,
  onClick,
  type = "button",
  disabled = false,
  ...rest
}) {
  const Comp = href ? "a" : as;

  const sizeStyles = {
    sm: { padding: "8px 10px", fontSize: 14 },
    md: { padding: "10px 14px", fontSize: 15 },
    lg: { padding: "12px 16px", fontSize: 16 }
  }[size];

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: "var(--radius-md)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "var(--transition-base)",
    boxShadow: "var(--shadow-sm)",
    textDecoration: "none",
    userSelect: "none",
    ...sizeStyles
  };

  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "#fff"
    },
    outline: {
      background: "transparent",
      color: "var(--color-primary)",
      borderColor: "rgba(37,99,235,0.35)"
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text)"
    }
  };

  const style = { ...baseStyle, ...variants[variant] };

  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <Comp
      className={`btn ${variant} ${className}`}
      style={style}
      href={href}
      onClick={onClick}
      onKeyDown={Comp !== "button" ? handleKeyDown : undefined}
      type={Comp === "button" ? type : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {children}
    </Comp>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  as: PropTypes.oneOf(["button", "a"]),
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

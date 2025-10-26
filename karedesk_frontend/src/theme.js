//
// Ocean Professional Theme Tokens
//
// PUBLIC_INTERFACE
export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",    // Blue 600
    secondary: "#F59E0B",  // Amber 500 (also used for success accent)
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827"
  },
  gradient: {
    // From blue-500/10 to gray-50 equivalent
    from: "rgba(59,130,246,0.10)", // blue-500 at 10% alpha
    to: "#f9fafb"                  // gray-50-ish
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px"
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 8px rgba(0,0,0,0.08)",
    lg: "0 10px 15px rgba(0,0,0,0.10)"
  },
  transition: "all 200ms ease-in-out"
};

export default theme;

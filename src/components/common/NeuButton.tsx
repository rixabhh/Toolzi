type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function NeuButton({ className = "", variant = "primary", ...props }: Props) {
  return <button className={`neu-button ${variant === "ghost" ? "neu-button-ghost" : ""} ${className}`} {...props} />;
}

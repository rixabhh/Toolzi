import { ToolIcon } from "../common/ToolIcon";

const decor = [
  { icon: "markdown", category: "PDF", className: "decor-a" },
  { icon: "compress", category: "Image", className: "decor-b" },
  { icon: "qr", category: "Create", className: "decor-c" },
  { icon: "percent", category: "Calculate", className: "decor-d" },
  { icon: "clean", category: "Text", className: "decor-e" },
  { icon: "todo", category: "Productivity", className: "decor-f" },
  { icon: "json", category: "Developer", className: "decor-g" },
  { icon: "shield", category: "Privacy", className: "decor-h" }
] as const;

export function BackgroundDecor() {
  return (
    <div className="background-decor" aria-hidden="true">
      {decor.map((item) => (
        <ToolIcon key={item.className} name={item.icon} category={item.category} className={`decor-icon ${item.className}`} />
      ))}
    </div>
  );
}

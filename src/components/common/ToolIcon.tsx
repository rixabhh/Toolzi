import type { ToolCategory } from "../../tools/registry";

type IconName =
  | "markdown"
  | "merge"
  | "split"
  | "imagePdf"
  | "compress"
  | "resize"
  | "convert"
  | "background"
  | "word"
  | "case"
  | "clean"
  | "percent"
  | "gst"
  | "age"
  | "date"
  | "qr"
  | "invoice"
  | "signature"
  | "brat"
  | "json"
  | "base64"
  | "url"
  | "uuid"
  | "regex"
  | "color"
  | "gradient"
  | "html"
  | "table"
  | "diff"
  | "password"
  | "shield"
  | "hash"
  | "unit"
  | "bmi"
  | "loan"
  | "timer"
  | "stopwatch"
  | "favicon"
  | "notes"
  | "todo"
  | "toolbox"
  | "privacy"
  | "search";

type Props = {
  name: string;
  category?: ToolCategory;
  className?: string;
  label?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  markdown: (
    <>
      <path d="M4 7h16v10H4z" />
      <path d="M7 14V10l2 2 2-2v4" />
      <path d="M15 10v4" />
      <path d="M13.5 12.5 15 14l1.5-1.5" />
    </>
  ),
  merge: (
    <>
      <path d="M6 4h8l4 4v12H6z" />
      <path d="M14 4v4h4" />
      <path d="M8 12h8" />
      <path d="m13 9 3 3-3 3" />
    </>
  ),
  split: (
    <>
      <path d="M5 4h7l3 3v5" />
      <path d="M12 4v3h3" />
      <path d="M7 14h5" />
      <path d="M7 18h4" />
      <path d="M17 14v6" />
      <path d="m14 17 3-3 3 3" />
    </>
  ),
  imagePdf: (
    <>
      <path d="M5 5h14v14H5z" />
      <path d="m8 15 3-3 2 2 2-3 3 4" />
      <path d="M9 9h.01" />
    </>
  ),
  compress: (
    <>
      <path d="M8 4v5H4" />
      <path d="m4 9 5-5" />
      <path d="M16 20v-5h4" />
      <path d="m20 15-5 5" />
      <path d="M15 4h5v5" />
      <path d="m20 4-5 5" />
      <path d="M9 20H4v-5" />
      <path d="m4 20 5-5" />
    </>
  ),
  resize: (
    <>
      <path d="M5 5h14v14H5z" />
      <path d="M9 9h6v6H9z" />
      <path d="M5 12H3" />
      <path d="M21 12h-2" />
      <path d="M12 5V3" />
      <path d="M12 21v-2" />
    </>
  ),
  convert: (
    <>
      <path d="M7 7h10v10H7z" />
      <path d="M16 3h4v4" />
      <path d="M20 3 15 8" />
      <path d="M8 21H4v-4" />
      <path d="m4 21 5-5" />
    </>
  ),
  background: (
    <>
      <path d="M5 5h14v14H5z" />
      <path d="m8 16 3-4 2 2 2-3 3 5" />
      <path d="M8 8h.01" />
      <path d="m4 20 16-16" />
    </>
  ),
  word: (
    <>
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8" />
      <path d="M8 12h8" />
      <path d="M8 15h5" />
    </>
  ),
  case: (
    <>
      <path d="m4 17 4-10 4 10" />
      <path d="M5.5 13h5" />
      <path d="M14 17v-6a2 2 0 0 1 4 0v6" />
      <path d="M14 14h4" />
    </>
  ),
  clean: (
    <>
      <path d="M4 17 17 4l3 3L7 20H4z" />
      <path d="m14 7 3 3" />
      <path d="M13 20h7" />
    </>
  ),
  percent: (
    <>
      <path d="m19 5-14 14" />
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  gst: (
    <>
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
      <path d="M15 13h1" />
      <path d="M8 17h3" />
    </>
  ),
  age: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
      <path d="M12 6v2l1.5 1" />
    </>
  ),
  date: (
    <>
      <path d="M5 6h14v14H5z" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
      <path d="M5 10h14" />
      <path d="M8 14h2" />
      <path d="M13 14h3" />
    </>
  ),
  qr: (
    <>
      <path d="M5 5h5v5H5z" />
      <path d="M14 5h5v5h-5z" />
      <path d="M5 14h5v5H5z" />
      <path d="M14 14h2" />
      <path d="M18 14h1v2" />
      <path d="M14 18h5" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h3" />
    </>
  ),
  signature: (
    <>
      <path d="M4 18c3-7 5-7 6-1 1 4 3 1 4-1 1-2 2-2 3 1" />
      <path d="M4 21h16" />
      <path d="m15 4 5 5" />
      <path d="m14 10 4-4" />
    </>
  ),
  brat: (
    <>
      <path d="M5 7h14v10H5z" />
      <path d="M8 12h8" />
      <path d="M9 15h6" />
      <path d="M7 20h10" />
    </>
  ),
  json: <><path d="M8 8 5 12l3 4" /><path d="m16 8 3 4-3 4" /><path d="m13 6-2 12" /></>,
  base64: <><path d="M5 7h14v10H5z" /><path d="M8 11h3" /><path d="M8 14h5" /><path d="M15 11h1" /><path d="M16 14h.01" /></>,
  url: <><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></>,
  uuid: <><path d="M5 7h14" /><path d="M5 12h14" /><path d="M5 17h14" /><path d="M8 5v14" /><path d="M16 5v14" /></>,
  regex: <><path d="M6 17V7" /><path d="M3 10l3-3 3 3" /><path d="M12 12h.01" /><path d="m17 8 4 8" /><path d="m21 8-4 8" /></>,
  color: <><path d="M12 4a8 8 0 1 0 0 16h1.5a2 2 0 0 0 0-4H12a4 4 0 0 1 0-8h1a2 2 0 0 0 0-4z" /><circle cx="8" cy="11" r=".5" /><circle cx="11" cy="8" r=".5" /><circle cx="15" cy="11" r=".5" /></>,
  gradient: <><path d="M5 5h14v14H5z" /><path d="M7 17 17 7" /><path d="M7 12 12 7" /><path d="M12 17h5v-5" /></>,
  html: <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 6-4 12" /></>,
  table: <><path d="M5 5h14v14H5z" /><path d="M5 10h14" /><path d="M10 5v14" /><path d="M15 5v14" /></>,
  diff: <><path d="M5 7h8" /><path d="M5 12h14" /><path d="M5 17h6" /><path d="M16 15v4" /><path d="M14 17h4" /></>,
  password: <><path d="M7 11V8a5 5 0 0 1 10 0v3" /><path d="M5 11h14v10H5z" /><path d="M12 15v2" /></>,
  shield: <><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /><path d="M9 13h6" /></>,
  hash: <><path d="M9 4 7 20" /><path d="m17 4-2 16" /><path d="M5 9h15" /><path d="M4 15h15" /></>,
  unit: <><path d="M5 6h14" /><path d="M7 6v12" /><path d="M17 6v12" /><path d="M10 14h4" /><path d="M10 18h4" /></>,
  bmi: <><path d="M6 20V9a6 6 0 0 1 12 0v11" /><path d="M9 20v-6" /><path d="M15 20v-6" /><path d="M9 9h6" /></>,
  loan: <><path d="M5 6h14v12H5z" /><path d="M8 10h8" /><path d="M8 14h5" /><path d="M16 14h.01" /></>,
  timer: <><circle cx="12" cy="13" r="7" /><path d="M12 13V9" /><path d="M9 3h6" /><path d="m16 6 2-2" /></>,
  stopwatch: <><circle cx="12" cy="13" r="7" /><path d="M12 13h4" /><path d="M12 13V8" /><path d="M9 3h6" /></>,
  favicon: <><path d="M7 7h10v10H7z" /><path d="M4 4h4" /><path d="M16 4h4" /><path d="M4 16v4h4" /><path d="M16 20h4v-4" /></>,
  notes: (
    <>
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </>
  ),
  todo: (
    <>
      <path d="M5 6h14" />
      <path d="M5 12h14" />
      <path d="M5 18h14" />
      <path d="m7 6 1 1 2-2" />
    </>
  ),
  toolbox: (
    <>
      <path d="M4 9h16v10H4z" />
      <path d="M9 9V6h6v3" />
      <path d="M4 13h16" />
      <path d="M11 13h2" />
    </>
  ),
  privacy: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  )
};

export function ToolIcon({ name, category, className = "", label }: Props) {
  const iconName = (paths[name as IconName] ? name : "toolbox") as IconName;
  return (
    <span className={`icon-shell ${category ? `category-${category.toLowerCase()}` : ""} ${className}`} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[iconName]}
      </svg>
    </span>
  );
}

export function Dropzone({
  label,
  hint,
  accept,
  multiple,
  onFiles
}: {
  label: string;
  hint?: string;
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
}) {
  return (
    <label className="dropzone">
      <span>{label}</span>
      <small>{hint ?? `Click to choose ${multiple ? "files" : "a file"}. Files stay in this browser.`}</small>
      <strong>Browse</strong>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => onFiles(Array.from(event.currentTarget.files ?? []))}
      />
    </label>
  );
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function revokeObjectUrl(url: string): void {
  URL.revokeObjectURL(url);
}

export async function copyText(value: string): Promise<void> {
  await navigator.clipboard.writeText(value);
}

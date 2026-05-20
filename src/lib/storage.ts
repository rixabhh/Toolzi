export function readLocalJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocalJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalValue(key: string): void {
  localStorage.removeItem(key);
}

export function addRecentTool(id: string) {
  const current = readLocalJson<string[]>("toolzi:recent-tools", []);
  writeLocalJson("toolzi:recent-tools", [id, ...current.filter((item) => item !== id)].slice(0, 8));
}

export function readFavoriteTools() {
  return readLocalJson<string[]>("toolzi:favorite-tools", []);
}

export function isFavoriteTool(id: string) {
  return readFavoriteTools().includes(id);
}

export function toggleFavoriteTool(id: string) {
  const current = readFavoriteTools();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [id, ...current];
  writeLocalJson("toolzi:favorite-tools", next);
  window.dispatchEvent(new CustomEvent("toolzi:favorites-changed", { detail: next }));
  return next;
}

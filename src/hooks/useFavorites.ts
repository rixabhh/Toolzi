import { useEffect, useState } from "react";
import { readFavoriteTools, toggleFavoriteTool } from "../lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readFavoriteTools());

  useEffect(() => {
    const sync = () => setFavorites(readFavoriteTools());
    const syncFromEvent = (event: Event) => {
      setFavorites((event as CustomEvent<string[]>).detail ?? readFavoriteTools());
    };
    window.addEventListener("storage", sync);
    window.addEventListener("toolzi:favorites-changed", syncFromEvent);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("toolzi:favorites-changed", syncFromEvent);
    };
  }, []);

  return {
    favorites,
    isFavorite: (id: string) => favorites.includes(id),
    toggleFavorite: (id: string) => setFavorites(toggleFavoriteTool(id))
  };
}

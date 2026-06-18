import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ToolStoreState = {
  favorites: string[];
  recents: string[];
  settings: {
    theme: 'dark' | 'light';
  };
};

export const useToolStore = create<ToolStoreState>()(
  persist<ToolStoreState>(
    () => ({
      favorites: [],
      recents: [],
      settings: {
        theme: 'dark',
      },
    }),
    {
      name: 'toolzi:tool-store',
    }
  )
);

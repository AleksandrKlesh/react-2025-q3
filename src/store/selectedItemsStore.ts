import { create } from 'zustand';
import type { Character } from '../types';

interface SelectedItemsState {
  selectedItems: Record<number, Character>;
  toggleItem: (item: Character) => void;
  clearItems: () => void;
}

export const selectedItemsStore = create<SelectedItemsState>((set) => ({
  selectedItems: {},
  toggleItem: (item) =>
    set((state) => {
      const exists = state.selectedItems[item.id];
      const updated = Object.fromEntries(
        Object.entries(state.selectedItems).filter(
          ([id]) => Number(id) !== item.id
        )
      );

      if (!exists) {
        updated[item.id] = item;
      }
      return { selectedItems: updated };
    }),
  clearItems: () => set({ selectedItems: {} }),
}));

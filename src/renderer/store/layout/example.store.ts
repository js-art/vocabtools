import { create } from 'zustand';
import { devtools,persist } from 'zustand/middleware';

export interface HistoryStackStore {
  historyBack: string[];
  historyForward: string[];
  setHistoryBack: (historyBack: string[]) => void;
  setHistoryForward: (historyForward: string[]) => void;
}

const defaultStore = {
  historyBack: [],
  historyForward: [],
};

export const useHistoryStackStore = create(
  devtools(
    persist<HistoryStackStore>(
    (set) => ({
      ...defaultStore,
      setHistoryBack: (historyBack: string[]) => set({ historyBack }),
      setHistoryForward: (historyForward: string[]) => set({ historyForward }),
      }
  
    ),{name:'historyStackStore'})
  
  )
);

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM (24h)
  birthPlace: string;
  gender: 'male' | 'female' | 'other';
  mbtiType?: string;
}

interface AppStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  hasProfile: () => boolean;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
      hasProfile: () => get().profile !== null,
    }),
    {
      name: 'astrology-app-store',
    }
  )
);

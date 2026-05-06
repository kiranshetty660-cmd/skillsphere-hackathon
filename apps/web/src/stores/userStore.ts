import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Notification } from '@shared/types'; // We'll configure aliases

type ScreenName = 'home' | 'training' | 'testing' | 'pitchbyte' | 'performance' | 'community' | 'collaborate' | 'jobs' | 'certifications' | 'login' | 'interest';

interface UserState {
  user: User | null;
  accessToken: string | null;
  screen: ScreenName;
  theme: 'light' | 'dark';
  notifications: Notification[];
  unreadCount: number;
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setScreen: (screen: ScreenName) => void;
  toggleTheme: () => void;
  addNotification: (n: Notification) => void;
  markAllRead: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      screen: 'login',
      theme: 'light',
      notifications: [],
      unreadCount: 0,
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ accessToken: token }),
      setScreen: (screen) => set({ screen }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      addNotification: (n) => set((state) => ({ 
        notifications: [n, ...state.notifications],
        unreadCount: state.unreadCount + 1
      })),
      markAllRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      })),
      logout: () => set({ user: null, accessToken: null, screen: 'login' }),
    }),
    {
      name: 'skillsphere-storage',
      partialize: (state) => ({ accessToken: state.accessToken, theme: state.theme, user: state.user, screen: state.screen }),
    }
  )
);

import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUserStore } from './stores/userStore';
import LoginScreen from './screens/LoginScreen';
import InterestScreen from './screens/InterestScreen';
import AppShell from './components/layout/AppShell';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { theme, screen, accessToken, addNotification } = useUserStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Real-time Socket Connection
  useEffect(() => {
    if (accessToken) {
      const socket = io('/', { path: '/socket.io' }); // Proxied by Vite
      
      socket.on('notification', (notif: any) => {
        addNotification(notif);
        toast(notif.body, { 
          icon: notif.type === 'social' ? '💬' : '🔔',
          style: { background: 'var(--surface)', color: 'var(--text)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border)', fontSize: '13px', fontFamily: 'inherit' }
        });
      });

      return () => { socket.disconnect(); };
    }
  }, [accessToken, addNotification]);

  if (!accessToken) {
    if (screen === 'interest') return <InterestScreen />;
    return <LoginScreen />;
  }

  // Once authenticated, show AppShell which decides the active dashboard screen
  return (
    <>
      <ToastContainer position="bottom-right" theme={theme} autoClose={4000} hideProgressBar />
      <AppShell />
    </>
  );
}

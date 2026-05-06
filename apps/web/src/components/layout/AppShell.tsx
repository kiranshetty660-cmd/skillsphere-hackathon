import React from 'react';
import { useUserStore } from '@/stores/userStore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import HomeScreen from '@/screens/HomeScreen';
import TrainingScreen from '@/screens/TrainingScreen';
import TestingScreen from '@/screens/TestingScreen';
import PitchByteScreen from '@/screens/PitchByteScreen';
import PerformanceScreen from '@/screens/PerformanceScreen';
import CommunityScreen from '@/screens/CommunityScreen';
import CollaborateScreen from '@/screens/CollaborateScreen';
import JobsScreen from '@/screens/JobsScreen';
import CertificationsScreen from '@/screens/CertificationsScreen';

export default function AppShell() {
  const { screen } = useUserStore();

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen />;
      case 'training': return <TrainingScreen />;
      case 'testing': return <TestingScreen />;
      case 'pitchbyte': return <PitchByteScreen />;
      case 'performance': return <PerformanceScreen />;
      case 'community': return <CommunityScreen />;
      case 'collaborate': return <CollaborateScreen />;
      case 'jobs': return <JobsScreen />;
      case 'certifications': return <CertificationsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

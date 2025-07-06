import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/theme-provider';
import { SocketProvider } from './context/SocketProvider';
import { PremiumProvider } from './context/PremiumProvider';
import { CoinProvider } from './context/CoinProvider';
import { FriendsProvider } from './context/FriendsProvider';

// Import screens
import SplashScreen from './components/SplashScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import IntroScreen from './screens/IntroScreen';
import UserSetup from './screens/UserSetup';
import Home from './screens/Home';
import VideoChat from './screens/VideoChat';
import ChatPage from './screens/ChatPage';
import FriendsPage from './screens/FriendsPage';
import VoicePage from './screens/VoicePage';
import ProfilePage from './screens/ProfilePage';
import PremiumTrialPrompt from './screens/PremiumTrialPrompt';

// Import i18n
import './i18n';

import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="ajnabicam-theme">
        <CoinProvider>
          <PremiumProvider>
            <FriendsProvider>
              <SocketProvider>
                <Router>
                  <div className="App">
                    <Routes>
                      {/* Initial setup routes */}
                      <Route path="/intro" element={<IntroScreen />} />
                      <Route path="/language-selection" element={<LanguageSelectionScreen />} />
                      <Route path="/user-setup" element={<UserSetup />} />
                      <Route path="/premium-trial" element={<PremiumTrialPrompt />} />
                      
                      {/* Main app routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/video-chat" element={<VideoChat />} />
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/friends" element={<FriendsPage />} />
                      <Route path="/voice" element={<VoicePage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      
                      {/* Redirect unknown routes to home */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                </Router>
              </SocketProvider>
            </FriendsProvider>
          </PremiumProvider>
        </CoinProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
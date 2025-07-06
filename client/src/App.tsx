import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/theme-provider';
import { SocketProvider } from './context/SocketProvider';
import { PremiumProvider } from './context/PremiumProvider';
import { CoinProvider } from './context/CoinProvider';
import { FriendsProvider } from './context/FriendsProvider';

// Import screens
import SplashScreen from './components/SplashScreen';
import Home from './screens/Home';

// Import i18n
import './i18n';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');

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
                <div className="App">
                  <Home />
                </div>
              </SocketProvider>
            </FriendsProvider>
          </PremiumProvider>
        </CoinProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import VideoChat from "./screens/VideoChat";
import SplashScreen from "./components/SplashScreen";
import LanguageSelectionScreen from "./screens/LanguageSelectionScreen";
import ReferToUnlock from "./screens/ReferToUnlock";
import ReferralCodeScreen from "./screens/ReferralCode";
import GenderSelect from "./screens/GenderSelect";
import ChatPage from "./screens/ChatPage";
import VoicePage from "./screens/VoicePage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import UserSetup from "./screens/UserSetup";
import PersonalChat from "./screens/PersonalChat";
import FriendsPage from "./screens/FriendsPage";

import { useNavigate } from "react-router-dom";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const navigate = useNavigate();
  const { i18n, ready } = useTranslation();

  useEffect(() => {
    // Wait for i18n to be ready
    if (ready) {
      setAppReady(true);
    }
  }, [ready]);

  useEffect(() => {
    if (!showSplash && appReady) {
      // Check if language has been selected
      const languageSelected = localStorage.getItem("ajnabicam_language_selected");
      const savedLanguage = localStorage.getItem("ajnabicam_language");
      
      if (savedLanguage && i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      
      if (!languageSelected) {
        navigate("/language-selection", { replace: true });
        return;
      }

      // Check if user has completed setup
      const userData = localStorage.getItem("ajnabicam_user_data");
      const firstOpen = localStorage.getItem("ajnabicam_first_open");

      if (!firstOpen) {
        localStorage.setItem("ajnabicam_first_open", "true");
        navigate("/user-setup", { replace: true });
      } else if (!userData || !JSON.parse(userData).setupComplete) {
        navigate("/user-setup", { replace: true });
      }
    }
  }, [showSplash, appReady, navigate, i18n]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show splash screen while app is loading
  if (showSplash || !appReady) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/language-selection" element={<LanguageSelectionScreen />} />
        <Route path="/user-setup" element={<UserSetup />} />
        <Route path="/premium-trial" element={<ReferToUnlock />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/gender-select" element={<GenderSelect />} />
        <Route path="/video-chat" element={<VideoChat />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/personal-chat" element={<PersonalChat />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/refer" element={<ReferToUnlock />} />
        <Route path="/referral-code" element={<ReferralCodeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
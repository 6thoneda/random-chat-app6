import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center justify-center animate-fade-in">
        {/* App Logo/Icon */}
        <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl flex items-center justify-center">
            <div className="text-white text-4xl font-bold">AC</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-bold text-purple-800 mb-4 text-center">
          {t('app.name')}
        </h1>
        
        {/* Tagline */}
        <p className="text-purple-600 text-lg font-medium mb-8 text-center">
          {t('app.tagline')}
        </p>
        
        {/* Loading animation */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-purple-700 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <p className="text-purple-700 text-lg font-medium mt-4 animate-pulse">
          {t('splash.loading')}
        </p>
      </div>
    </div>
  );
}
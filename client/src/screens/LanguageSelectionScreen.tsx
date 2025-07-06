import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

export default function LanguageSelectionScreen() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleLanguageSelect = (languageCode: string) => {
    // Change language
    i18n.changeLanguage(languageCode);
    
    // Store in localStorage
    localStorage.setItem('ajnabicam_language', languageCode);
    
    // Mark language selection as complete
    localStorage.setItem('ajnabicam_language_selected', 'true');
    
    // Navigate to user setup
    navigate('/user-setup', { replace: true });
  };

  return (
    <LanguageSelector 
      onLanguageSelect={handleLanguageSelect}
      selectedLanguage={i18n.language}
    />
  );
}
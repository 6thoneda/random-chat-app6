import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Check, Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
];

interface LanguageSelectorProps {
  onLanguageSelect: (languageCode: string) => void;
  selectedLanguage?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function LanguageSelector({ 
  onLanguageSelect, 
  selectedLanguage, 
  isModal = false,
  onClose 
}: LanguageSelectorProps) {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(selectedLanguage || i18n.language || 'en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelected(languageCode);
    if (isModal) {
      // For modal, just update selection
      return;
    }
    // For initial setup, immediately apply
    onLanguageSelect(languageCode);
  };

  const handleContinue = () => {
    onLanguageSelect(selected);
    if (onClose) onClose();
  };

  const content = (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
            <Globe className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-purple-700">
          {t('language.title')}
        </CardTitle>
        <p className="text-gray-600 mt-2">
          {t('language.subtitle')}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selected === language.code
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {language.nativeName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {language.name}
                    </div>
                  </div>
                </div>
                {selected === language.code && (
                  <Check className="h-5 w-5 text-purple-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg mt-6"
        >
          {t('language.continue')}
        </Button>
      </CardContent>
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-2xl">
          {content}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl">
        {content}
      </Card>
    </div>
  );
}
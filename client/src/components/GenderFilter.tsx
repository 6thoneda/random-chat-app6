import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, User, Crown } from "lucide-react";

interface GenderFilterProps {
  isPremium: boolean;
  onGenderSelect: (gender: string) => void;
  onUpgrade: () => void;
}

export default function GenderFilter({ isPremium, onGenderSelect, onUpgrade }: GenderFilterProps) {
  const [selectedGender, setSelectedGender] = useState<string>("any");
  const { t } = useTranslation();

  const genderOptions = [
    { 
      id: "any", 
      label: t('home.genderFilter.anyone'), 
      icon: Users, 
      description: t('home.genderFilter.anyoneDesc'), 
      emoji: "👥" 
    },
    { 
      id: "male", 
      label: t('home.genderFilter.male'), 
      icon: User, 
      description: t('home.genderFilter.maleDesc'), 
      emoji: "👨" 
    },
    { 
      id: "female", 
      label: t('home.genderFilter.female'), 
      icon: User, 
      description: t('home.genderFilter.femaleDesc'), 
      emoji: "👩" 
    }
  ];

  const handleGenderChange = (gender: string) => {
    if (!isPremium && gender !== "any") {
      onUpgrade();
      return;
    }
    setSelectedGender(gender);
    onGenderSelect(gender);
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border-rose-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-lg">
        <CardTitle className="text-lg flex items-center gap-2 text-rose-700">
          <Users className="h-5 w-5" />
          {t('home.genderFilter.title')}
          {!isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {genderOptions.map((option) => {
            const isLocked = !isPremium && option.id !== "any";
            
            return (
              <Button
                key={option.id}
                variant={selectedGender === option.id ? "default" : "outline"}
                className={`justify-start h-auto p-4 rounded-xl transition-all duration-200 ${
                  selectedGender === option.id 
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md transform scale-105" 
                    : "hover:bg-rose-50 border-rose-200"
                } ${isLocked ? "opacity-60" : ""}`}
                onClick={() => handleGenderChange(option.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </div>
                  {isLocked && (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
        
        {!isPremium && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl text-center border border-purple-200">
            <p className="text-sm text-purple-700 mb-3 font-medium">
              {t('home.genderFilter.unlock')}
            </p>
            <Button
              size="sm"
              onClick={onUpgrade}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 shadow-md transform hover:scale-105 transition-all duration-200"
            >
              <Crown className="h-4 w-4 mr-2" />
              {t('home.genderFilter.upgradeNow')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coins, Gift, Play, Users, Crown, X, Star, Zap } from "lucide-react";
import { useCoin } from "../context/CoinProvider";
import { usePremium } from "../context/PremiumProvider";

interface TreasureChestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TreasureChest({ isOpen, onClose }: TreasureChestProps) {
  const { coins, watchAd, referFriend } = useCoin();
  const { isPremium } = usePremium();
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const coinPacks = [
    { coins: 50, price: "₹29", popular: false, bonus: "" },
    { coins: 120, price: "₹59", popular: true, bonus: t('coins.bonus', { count: 20 }) },
    { coins: 250, price: "₹99", popular: false, bonus: t('coins.bonus', { count: 50 }) },
    { coins: 500, price: "₹179", popular: false, bonus: t('coins.bonus', { count: 100 }) },
  ];

  const handlePurchasePack = (pack: typeof coinPacks[0]) => {
    // Simulate in-app purchase
    alert(t('notifications.coinsPurchased', { 
      defaultValue: `🎉 You purchased ${pack.coins} coins for ${pack.price}!`,
      coins: pack.coins,
      price: pack.price
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 shadow-2xl">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 p-1 text-rose-500 hover:bg-rose-100"
          >
            <X size={20} />
          </Button>
          
          {/* Animated Treasure Chest */}
          <div className="flex justify-center mb-4">
            <div className={`relative ${isAnimating ? 'animate-bounce' : ''}`}>
              <div className="w-20 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg relative overflow-hidden shadow-lg">
                {/* Chest body */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500"></div>
                {/* Chest lid */}
                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-br from-rose-300 to-pink-400 rounded-t-lg transform-gpu transition-transform duration-500 ${isAnimating ? 'rotate-12 -translate-y-2' : ''}`}></div>
                {/* Lock */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
                {/* Sparkles */}
                {isAnimating && (
                  <>
                    <div className="absolute -top-2 -left-2 text-rose-300 animate-ping">✨</div>
                    <div className="absolute -top-3 -right-1 text-pink-300 animate-ping" style={{animationDelay: '0.2s'}}>✨</div>
                    <div className="absolute -top-1 left-1/2 text-rose-300 animate-ping" style={{animationDelay: '0.4s'}}>✨</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {t('coins.title')}
          </CardTitle>
          
          {/* Current Balance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 inline-block mt-2 border border-rose-200">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-rose-600" />
              <span className="font-bold text-lg text-rose-700">{t('coins.currentBalance', { count: coins })}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Free Coin Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-rose-800 text-center flex items-center justify-center gap-2">
              <Gift className="h-5 w-5" />
              {t('coins.earnFree')}
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={watchAd}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200"
              >
                <Play className="h-5 w-5 mr-2" />
                <div className="flex flex-col items-start">
                  <span>{t('coins.watchAd')}</span>
                  <span className="text-xs text-green-100">{t('coins.watchAdDesc')}</span>
                </div>
                <div className="ml-auto bg-green-400 px-2 py-1 rounded-full text-xs font-bold">
                  +4
                </div>
              </Button>
              
              <Button
                onClick={referFriend}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200"
              >
                <Users className="h-5 w-5 mr-2" />
                <div className="flex flex-col items-start">
                  <span>{t('coins.referFriend')}</span>
                  <span className="text-xs text-blue-100">{t('coins.referFriendDesc')}</span>
                </div>
                <div className="ml-auto bg-blue-400 px-2 py-1 rounded-full text-xs font-bold">
                  +25
                </div>
              </Button>
            </div>
          </div>

          {/* Coin Packs */}
          <div className="space-y-3">
            <h3 className="font-semibold text-rose-800 text-center flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              {t('coins.coinPacks')}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {coinPacks.map((pack, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                    pack.popular 
                      ? "border-rose-400 bg-gradient-to-br from-rose-100 to-pink-100 shadow-lg" 
                      : "border-rose-300 bg-white hover:border-rose-400 hover:shadow-md"
                  }`}
                  onClick={() => handlePurchasePack(pack)}
                >
                  {pack.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                      <Star className="h-3 w-3 inline mr-1" />
                      {t('coins.popular')}
                    </div>
                  )}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Coins className="h-5 w-5 text-rose-600" />
                      <span className="font-bold text-lg text-rose-700">{pack.coins}</span>
                    </div>
                    {pack.bonus && (
                      <div className="text-xs text-green-600 font-bold mb-1">{pack.bonus}</div>
                    )}
                    <div className="text-xl font-bold text-rose-800">{pack.price}</div>
                    <div className="text-xs text-rose-500 mt-1">{t('coins.bestValue')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Upgrade */}
          {!isPremium && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center border-2 border-purple-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-700">{t('coins.goPremium')}</span>
              </div>
              <p className="text-sm text-purple-600 mb-3">
                {t('coins.goPremiumDesc')}
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 transition-all duration-200"
              >
                <Crown className="h-4 w-4 mr-2" />
                {t('coins.upgradeToPremium')}
              </Button>
            </div>
          )}

          <div className="text-center space-y-2">
            <p className="text-xs text-rose-500 font-medium">
              {t('coins.securePayments')}
            </p>
            <div className="flex justify-center gap-4 text-xs text-rose-400">
              <span>{t('coins.paymentMethods')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean;
  watchAd: () => void;
  referFriend: () => void;
}

const CoinContext = createContext<CoinContextType | null>(null);

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("useCoin must be used within a CoinProvider");
  }
  return context;
};

interface CoinProviderProps {
  children: ReactNode;
}

export const CoinProvider = ({ children }: CoinProviderProps) => {
  const [coins, setCoins] = useState(0);

  // Initialize coins on mount
  useEffect(() => {
    try {
      const savedCoins = localStorage.getItem("ajnabicam_coins");
      const hasOnboarded = localStorage.getItem("ajnabicam_onboarded");
      
      if (savedCoins) {
        const parsedCoins = parseInt(savedCoins);
        if (!isNaN(parsedCoins) && parsedCoins >= 0) {
          setCoins(parsedCoins);
        } else {
          // Invalid coin data, reset
          setCoins(30);
          localStorage.setItem("ajnabicam_coins", "30");
        }
      } else if (!hasOnboarded) {
        // Give 30 free coins for new users
        setCoins(30);
        localStorage.setItem("ajnabicam_coins", "30");
        localStorage.setItem("ajnabicam_onboarded", "true");
      }
    } catch (error) {
      console.error("Error initializing coins:", error);
      setCoins(30);
      localStorage.setItem("ajnabicam_coins", "30");
    }
  }, []);

  const addCoins = (amount: number) => {
    try {
      if (amount > 0) {
        const newAmount = coins + amount;
        setCoins(newAmount);
        localStorage.setItem("ajnabicam_coins", newAmount.toString());
      }
    } catch (error) {
      console.error("Error adding coins:", error);
    }
  };

  const deductCoins = (amount: number): boolean => {
    try {
      if (amount > 0 && coins >= amount) {
        const newAmount = coins - amount;
        setCoins(newAmount);
        localStorage.setItem("ajnabicam_coins", newAmount.toString());
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deducting coins:", error);
      return false;
    }
  };

  const watchAd = () => {
    try {
      // Simulate watching an ad
      addCoins(4);
      alert("🎉 You earned 4 coins for watching an ad!");
    } catch (error) {
      console.error("Error watching ad:", error);
    }
  };

  const referFriend = () => {
    try {
      // Simulate successful referral
      addCoins(25);
      alert("🎉 You earned 25 coins for referring a friend!");
    } catch (error) {
      console.error("Error referring friend:", error);
    }
  };

  return (
    <CoinContext.Provider
      value={{
        coins,
        addCoins,
        deductCoins,
        watchAd,
        referFriend,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
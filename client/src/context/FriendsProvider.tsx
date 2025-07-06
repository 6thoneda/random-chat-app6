import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  addedAt: Date;
}

interface FriendsContextType {
  friends: Friend[];
  addFriend: (friend: Omit<Friend, 'addedAt'>) => boolean;
  removeFriend: (friendId: string) => void;
  updateFriendStatus: (friendId: string, isOnline: boolean) => void;
  canAddMoreFriends: boolean;
  maxFreeLimit: number;
  getFriendById: (friendId: string) => Friend | undefined;
}

const FriendsContext = createContext<FriendsContextType | null>(null);

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider");
  }
  return context;
};

interface FriendsProviderProps {
  children: ReactNode;
}

export const FriendsProvider = ({ children }: FriendsProviderProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const maxFreeLimit = 3;

  // Load friends from localStorage on mount
  useEffect(() => {
    try {
      const savedFriends = localStorage.getItem("ajnabicam_friends");
      if (savedFriends) {
        const parsedFriends = JSON.parse(savedFriends).map((friend: any) => ({
          ...friend,
          addedAt: new Date(friend.addedAt),
          lastSeen: friend.lastSeen ? new Date(friend.lastSeen) : undefined
        }));
        setFriends(parsedFriends);
      }
    } catch (error) {
      console.error("Error loading friends:", error);
      setFriends([]);
      localStorage.removeItem("ajnabicam_friends");
    }
  }, []);

  // Save friends to localStorage whenever friends change
  useEffect(() => {
    try {
      if (friends.length >= 0) {
        localStorage.setItem("ajnabicam_friends", JSON.stringify(friends));
      }
    } catch (error) {
      console.error("Error saving friends:", error);
    }
  }, [friends]);

  const addFriend = (newFriend: Omit<Friend, 'addedAt'>): boolean => {
    try {
      // Check if user has premium
      const isPremium = localStorage.getItem("premium_status") === "true";
      
      // Check if already at limit for free users
      if (!isPremium && friends.length >= maxFreeLimit) {
        return false; // Cannot add more friends
      }

      // Check if friend already exists
      if (friends.some(friend => friend.id === newFriend.id)) {
        return true; // Already friends
      }

      const friendWithDate: Friend = {
        ...newFriend,
        addedAt: new Date()
      };

      setFriends(prev => [...prev, friendWithDate]);
      return true;
    } catch (error) {
      console.error("Error adding friend:", error);
      return false;
    }
  };

  const removeFriend = (friendId: string) => {
    try {
      setFriends(prev => prev.filter(friend => friend.id !== friendId));
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const updateFriendStatus = (friendId: string, isOnline: boolean) => {
    try {
      setFriends(prev => prev.map(friend => 
        friend.id === friendId 
          ? { 
              ...friend, 
              isOnline, 
              lastSeen: isOnline ? undefined : new Date() 
            }
          : friend
      ));
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  const getFriendById = (friendId: string): Friend | undefined => {
    try {
      return friends.find(friend => friend.id === friendId);
    } catch (error) {
      console.error("Error getting friend by ID:", error);
      return undefined;
    }
  };

  const isPremium = localStorage.getItem("premium_status") === "true";
  const canAddMoreFriends = isPremium || friends.length < maxFreeLimit;

  return (
    <FriendsContext.Provider
      value={{
        friends,
        addFriend,
        removeFriend,
        updateFriendStatus,
        canAddMoreFriends,
        maxFreeLimit,
        getFriendById,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
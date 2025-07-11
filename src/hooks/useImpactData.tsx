import React, { createContext, useContext } from "react";

// Unified demo impact data for all sections
const demoImpactData = {
  bagsReserved: 1,
  mealsSaved: 156,
  co2Reduced: 2,
  moneySaved: 4560,
  treesSaved: 0,
  wasteDiverted: 2,
  totalPurchases: 23,
  currentStreak: 12,
  // For ImpactTracker
  xp: 1850,
  nextLevelXp: 2200,
  level: 5,
  avatar: "🧑‍🌾",
  accessories: [0, 3],
  ecoPet: 2,
  co2Saved: 78.5,
  co2Goal: 100,
  waterSaved: 2340,
  waterGoal: 3000,
  mealsGoal: 200,
  moneyGoal: 6000,
  plasticSaved: 12.4,
  plasticGoal: 15,
  landfillSaved: 38,
  landfillGoal: 50,
  energySaved: 210,
  energyGoal: 300,
  communityHelped: 24,
  communityGoal: 30,
  streakGoal: 14,
};

const ImpactDataContext = createContext(demoImpactData);

export const ImpactDataProvider = ({ children }: { children: React.ReactNode }) => {
  // In the future, fetch or compute real data here
  return (
    <ImpactDataContext.Provider value={demoImpactData}>
      {children}
    </ImpactDataContext.Provider>
  );
};

export const useImpactData = () => useContext(ImpactDataContext); 
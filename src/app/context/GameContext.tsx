import React, { createContext, useContext, useState, ReactNode } from 'react';

type Tool = {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
};

type Badge = {
  id: string;
  name: string;
  description: string;
  earned: boolean;
};

type UserProfile = {
  name: string;
  level: 'Student' | 'Technician' | 'Engineer';
  xp: number;
  tools: Tool[];
  badges: Badge[];
};

type GameState = {
  user: UserProfile;
  selectedLevel: 'S1' | 'S2' | 'S3' | 'S4_S6' | 'IB';
  setSelectedLevel: (level: 'S1' | 'S2' | 'S3' | 'S4_S6' | 'IB') => void;
  addXp: (amount: number) => void;
  unlockTool: (toolId: string) => void;
  completeModule: (moduleId: string) => void;
  completedModules: string[];
};

const initialTools: Tool[] = [
  { id: 'safety_goggles', name: '護目鏡 (Safety Goggles)', icon: 'Glasses', unlocked: false },
  { id: 'caliper', name: '遊標卡尺 (Caliper)', icon: 'Ruler', unlocked: false },
  { id: 'multimeter', name: '萬用錶 (Multimeter)', icon: 'Zap', unlocked: false },
];

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>({
    name: '陳大文',
    level: 'Student',
    xp: 0,
    tools: initialTools,
    badges: [],
  });
  
  const [selectedLevel, setSelectedLevel] = useState<'S1' | 'S2' | 'S3' | 'S4_S6' | 'IB'>('S1');
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const addXp = (amount: number) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      if (newXp > 1000) newLevel = 'Engineer';
      else if (newXp > 500) newLevel = 'Technician';
      
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const unlockTool = (toolId: string) => {
    setUser((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === toolId ? { ...t, unlocked: true } : t)),
    }));
  };

  const completeModule = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
      addXp(200);
    }
  };

  return (
    <GameContext.Provider value={{ user, selectedLevel, setSelectedLevel, addXp, unlockTool, completeModule, completedModules }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

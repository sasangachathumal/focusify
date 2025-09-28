import { StatsPageContextType } from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import StatsPage from "../app/StatsPage";

const StatsPageContext = createContext<StatsPageContextType | undefined>(
  undefined
);

export const useStatsPage = () => {
  const context = useContext(StatsPageContext);
  if (!context) {
    throw new Error("useStatsPage must be used within StatsPageProvider");
  }
  return context;
};

export const StatsPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const openStats = useCallback(() => setVisible(true), []);
  const closeStats = useCallback(() => setVisible(false), []);

  return (
    <StatsPageContext.Provider value={{ openStats, closeStats }}>
      {children}
      <StatsPage visible={visible} onClose={closeStats} />
    </StatsPageContext.Provider>
  );
};

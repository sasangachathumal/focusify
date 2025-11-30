import { FocusSessionContextType } from "@/types";
import React, { createContext, useContext, useState } from "react";

const FocusSessionContext = createContext<FocusSessionContextType | null>(null);

export function FocusSessionProvider({ children }: { children: React.ReactNode }) {
  const [isCycleRunning, setIsCycleRunning] = useState(false);

  return (
    <FocusSessionContext.Provider
      value={{
        isCycleRunning,
        setIsCycleRunning
      }}
    >
      {children}
    </FocusSessionContext.Provider>
  );
}

export function useFocusSession() {
  const ctx = useContext(FocusSessionContext);
  if (!ctx) throw new Error("useFocusSession must be used inside provider");
  return ctx;
}

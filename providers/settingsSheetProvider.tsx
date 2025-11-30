// SettingsSheetProvider.tsx
import { SettingsSheetContextType } from "@/types";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";
import SettingsSheet from "../app/settingsSheet";
import { showNotification } from "../utils/InAppNotifications";
import { useFocusSession } from "./focusSessionProvider";

const SettingsSheetContext = createContext<
  SettingsSheetContextType | undefined
>(undefined);

export const useSettingsSheet = () => {
  const context = useContext(SettingsSheetContext);
  if (!context) {
    throw new Error(
      "useSettingsSheet must be used within SettingsSheetProvider"
    );
  }
  return context;
};

export const SettingsSheetProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { isCycleRunning } = useFocusSession();

  const openSettingsSheet = useCallback(() => {
    if (isCycleRunning) {
      showNotification(
        "error",
        "Cycle in progress ⏳",
        "You can't change settings during a focus session"
      );
      return;
    } else {
      bottomSheetRef.current?.present();
    }
  }, [isCycleRunning]);

  return (
    <BottomSheetModalProvider>
      <SettingsSheetContext.Provider value={{ openSettingsSheet }}>
        {children}
        <SettingsSheet ref={bottomSheetRef} />
      </SettingsSheetContext.Provider>
    </BottomSheetModalProvider>
  );
};

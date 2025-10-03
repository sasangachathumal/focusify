// SettingsSheetProvider.tsx
import { SettingsSheetContextType } from '@/types';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef
} from 'react';
import SettingsSheet from '../app/settingsSheet';

const SettingsSheetContext = createContext<SettingsSheetContextType | undefined>(undefined);

export const useSettingsSheet = () => {
  const context = useContext(SettingsSheetContext);
  if (!context) {
    throw new Error('useSettingsSheet must be used within SettingsSheetProvider');
  }
  return context;
};

export const SettingsSheetProvider = ({ children }: { children: ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSettingsSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SettingsSheetContext.Provider value={{ openSettingsSheet }}>
        {children}
        <SettingsSheet ref={bottomSheetRef} />
      </SettingsSheetContext.Provider>
    </BottomSheetModalProvider>
  );
};

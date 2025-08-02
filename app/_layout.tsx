import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import { SettingsSheetProvider } from "./settingsSheetProvider";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsSheetProvider>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </SettingsSheetProvider>
      <Toast />
    </GestureHandlerRootView>
  );
};

export default _layout;

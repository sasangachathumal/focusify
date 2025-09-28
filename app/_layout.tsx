import { colors } from "@/constants/theme";
import { SettingsSheetProvider } from "@/providers/settingsSheetProvider";
import { StatsPageProvider } from "@/providers/StatsPageProvider";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const _layout = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SettingsSheetProvider>
        <StatsPageProvider>
          <StatusBar barStyle="light-content" backgroundColor={colors.black} />
          <SafeAreaView
            style={styles.safeArea}
            edges={["left", "right"]}
          >
            {/* Your navigation stack */}
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
          <Toast />
        </StatsPageProvider>
      </SettingsSheetProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black, // ensures entire app root is white
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.black, // ensures content background matches status bar and root
  },
});

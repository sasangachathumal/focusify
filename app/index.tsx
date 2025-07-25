import { colors } from "@/constants/theme";
import { PomodoroSettings } from "@/types";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import {
  getPomodoroSettings,
  savePomodoroSettings,
} from "../storage/pomodoroStorage";

const index = () => {
  useEffect(() => {
    const router = useRouter();
    setDefaultSetting();
    setTimeout(() => {
      router.push("/welcome");
    }, 2000);
  }, []);

  const setDefaultSetting = () => {
    const settings: PomodoroSettings | null = getPomodoroSettings();
    if (!settings?.work) {
      savePomodoroSettings({
        work: 25,
        shortBreak: 5,
        longBreak: 15,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        entering={BounceIn.duration(1000)}
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/logo/white/9.png")}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "30%",
    aspectRatio: 1,
  },
});

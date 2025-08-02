import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import { initializePomodoroSettings } from "../utils/initApp";

const index = () => {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await initializePomodoroSettings();
      setReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        router.push("/welcome");
      }, 2000);
    }
  }, [ready]);

  return (
    <View style={styles.container}>
      <Animated.Image
        entering={BounceIn.duration(1000)}
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/logo/white/9.png")}
      />
      {!ready && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
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

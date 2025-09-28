import Header from "@/components/Header";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useOrientation } from "@/utils/common";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { PlusIcon } from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  const router = useRouter();
  const { isLandscape } = useOrientation();

  let newCycle = () => {
    router.push("/cycle");
  };

  return (
    <>
      {/* Header */}
      <Header />
      {/* Home Page Content */}
      <View style={styles.pageContent}>
        {/* Text */}
        <Typo
          size={isLandscape ? 22 : 32}
          color={colors.primary}
          style={{ textAlign: "center" }}
        >
          Click the plus to begin a cycle
        </Typo>
        {/* Button */}
        <TouchableOpacity onPress={newCycle}>
          <View style={styles.newButtonWrap}>
            <PlusIcon
              size={verticalScale(100)}
              color={colors.neutral400}
              weight="regular"
            />
          </View>
        </TouchableOpacity>
        <View></View>
      </View>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pageContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  newButtonWrap: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 5,
    borderColor: colors.neutral400,
    borderRadius: 65,
    borderCurve: "circular",
  },
});

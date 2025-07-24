import Typo from "@/components/Typo";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { GearIcon, PlusIcon, TrophyIcon } from "phosphor-react-native";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const welcome = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../assets/images/logo/dark/4.png")}
          />
        </View>
        <View style={styles.iconButtonsContainer}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <TrophyIcon
                size={verticalScale(36)}
                color={colors.primary}
                weight="fill"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <GearIcon
                size={verticalScale(36)}
                color={colors.primary}
                weight="fill"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Home Page Content */}
      <View style={styles.pageContent}>
        {/* Text */}
        <Typo size={32} color={colors.primary} style={{textAlign: "center"}}>
          Click the plus to begin a cycle
        </Typo>
        {/* Button */}
        <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default welcome;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius._30,
    borderCurve: "circular",
  },
  logo: {
    height: 150,
    aspectRatio: 1,
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
    borderCurve: "circular"
  },
});

import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { GearIcon, TrophyIcon } from "phosphor-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
        <View>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/logo/dark/4.png")}
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
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logo: {
    height: 150,
    aspectRatio: 1,
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
});

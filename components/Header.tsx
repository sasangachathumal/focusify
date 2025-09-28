import { useSettingsSheet } from '@/providers/settingsSheetProvider';
import { useStatsPage } from "@/providers/StatsPageProvider";
import { useOrientation } from "@/utils/common";
import { verticalScale } from "@/utils/styling";
import { GearIcon, TrophyIcon } from "phosphor-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import IconButton from "./IconButton";

const Header = () => {
  const { openSettingsSheet } = useSettingsSheet();
  const { openStats } = useStatsPage();
  const { isLandscape } = useOrientation();
  return (
    <View style={[styles.headerContainer, {marginBottom: verticalScale(isLandscape ? 0 : 32), marginTop: verticalScale(isLandscape ? 5 : 12)}]}>
        <View>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/logo/dark/4.png")}
          />
        </View>
        <View style={styles.iconButtonsContainer}>
          <IconButton onPress={openStats} icon={TrophyIcon} />
          <IconButton onPress={openSettingsSheet} icon={GearIcon} />
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
    paddingHorizontal: 10
  },
  logo: {
    height: 100,
    aspectRatio: 1,
  },
  iconButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  }
});

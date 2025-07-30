import { GearIcon, TrophyIcon } from "phosphor-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import IconButton from "./IconButton";

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
          <IconButton onPress={()=> {}} icon={TrophyIcon} />
          <IconButton onPress={()=> {}} icon={GearIcon} />
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
  }
});

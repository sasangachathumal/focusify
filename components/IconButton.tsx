import { colors, radius } from '@/constants/theme';
import { IconButtonProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";


const IconButton = ({
  onPress,
  icon: Icon,
  size = verticalScale(36),
  color = colors.primary,
  weight = "fill",
  buttonStyle = {},
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.iconContainer, buttonStyle]}>
        <Icon size={size} color={color} weight={weight} />
      </View>
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: radius._30,
        borderCurve: "circular",
      }
})
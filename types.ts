import type { IconProps } from "phosphor-react-native";
import React, { ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";

export type PomodoroSettings = {
  work: number;       // in minutes
  shortBreak: number; // in minutes
  longBreak: number;  // in minutes
};

export type PomodoroHistoryEntry = {
  totalCycles: number;
  totalFocusMinutes: number;
  totalBreakMinutes: number;
};

export type PomodoroHistory = {
  [date: string]: PomodoroHistoryEntry;
};


export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

export type IconComponent = React.ComponentType<{
  height?: number;
  width?: number;
  strokeWidth?: number;
  color?: string;
  fill?: string;
}>;

// export type IconProps = {
//   name: string;
//   color?: string;
//   size?: number;
//   strokeWidth?: number;
//   fill?: string;
// };

export type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
  //   label?: string;
  //   error?: string;
}

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export type IconButtonProps = {
  onPress: () => void;
  icon: React.FC<IconProps>; // Any icon component from phosphor-react-native
  size?: number;
  color?: string;
  weight?: IconProps["weight"];
  buttonStyle?: ViewStyle;
};

export type SettingsSheetContextType = {
  openSettingsSheet: () => void;
};

export type SettingsSheetProviderProps = {
  children: any | null;
};

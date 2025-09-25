import { colors } from "@/constants/theme";
import { getPomodoroSettings } from "@/storage/pomodoroStorage";
import { BreakOverlayProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Button from "./Button";
import Typo from "./Typo";

const BreakOverlay = ({ visible, onFinish, type }: BreakOverlayProps) => {
  const [timeLeft, setTimeLeft] = useState(0 * 60);
  const [text, setText] = useState<string>("");
  const [duration, setDuration] = useState<number>(20 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (visible) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    (async () => {
      const settings = await getPomodoroSettings();
      if (settings?.shortBreak && type === "shortBreak") {
        setText("Short Break");
        setDuration(settings.shortBreak);
      } else if (settings?.longBreak && type === "longBreak") {
        setText("Long Break");
        setDuration(settings.longBreak);
      } else {
        setText("");
        setDuration(10 * 60);
      }
      setDuration(0.1);
      setTimeLeft(duration * 60);
      setIsRunning(true);
    })();
  }, [type, visible, duration]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (type === "longBreak") {
        onFinish(true);
      } else {
        onFinish(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onFinish, type]);

  useEffect(() => {
    if (visible) setTimeLeft(duration);
  }, [visible, duration]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const onDismissed = () => {
    if (type === "longBreak") {
      onFinish(true);
    } else {
      onFinish(false);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View>
          {type === "shortBreak" ? (
            <Typo size={verticalScale(72)}>☕</Typo>
            ) : (
              <Typo size={verticalScale(72)}>🌴</Typo>
            )}
        </View>
        <View>
          <Typo size={48} color={colors.white} fontWeight={"bold"}>
            {text}
          </Typo>
        </View>
        <View>
          <Typo size={60} color={colors.white} fontWeight={"bold"}>
            {formatTime(timeLeft)}
          </Typo>
        </View>
        <View>
          <Button style={styles.dismissButton} onPress={onDismissed}>
            <Typo color={colors.black} fontWeight={"bold"}>
              DISMISS
            </Typo>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default BreakOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: { fontSize: 48, fontWeight: "bold", color: "white" },
  text: { fontSize: 20, color: "white", marginTop: 20 },
  dismissButton: {
    marginTop: verticalScale(16),
    backgroundColor: colors.white,
    color: colors.black,
    paddingEnd: 24,
    paddingStart: 24,
    paddingTop: 12,
    paddingBottom: 12,
    height: verticalScale(60),
  },
});

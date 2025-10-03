import { colors } from "@/constants/theme";
import { updatePomodoroHistory } from "@/storage/pomodoroHistory";
import { getPomodoroSettings } from "@/storage/pomodoroStorage";
import { BreakOverlayProps } from "@/types";
import {
  formatDate,
  formatTime,
  getCurrentDate,
  useOrientation,
} from "@/utils/common";
import { verticalScale } from "@/utils/styling";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import React, { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Typo from "../components/Typo";

const BreakOverlay = ({ visible, onFinish, type }: BreakOverlayProps) => {
  const { isLandscape } = useOrientation();

  const [timeLeft, setTimeLeft] = useState(0 * 60);
  const [text, setText] = useState<string>("");
  const [duration, setDuration] = useState<number>(20 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [workDuration, setWorkDuration] = useState<number>(20 * 60);
  const [shortBreak, setShortBreak] = useState<number>(20 * 60);
  const [longBreak, setLongBreak] = useState<number>(20 * 60);

  const historyUpdate = useCallback(() => {
    const historyObj = {
      date: formatDate(getCurrentDate()),
      cycle: 1,
      focusMinutes: workDuration * 4,
      breakMinutes: shortBreak * 3 + longBreak,
    };
    updatePomodoroHistory(
      historyObj.date,
      historyObj.cycle,
      historyObj.focusMinutes,
      historyObj.breakMinutes
    );
  }, [workDuration, longBreak, shortBreak]);

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

      if (settings?.work) {
        setWorkDuration(settings.work);
      }
      if (settings?.shortBreak) {
        setShortBreak(settings.shortBreak);
      }
      if (settings?.longBreak) {
        setLongBreak(settings.longBreak);
      }

      setDuration(0.1); // remove
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
        historyUpdate();
        onFinish(true);
      } else {
        onFinish(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onFinish, type, historyUpdate]);

  useEffect(() => {
    if (visible) setTimeLeft(duration);
  }, [visible, duration]);

  const onDismissed = () => {
    if (type === "longBreak") {
      historyUpdate();
      onFinish(true);
    } else {
      onFinish(false);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={[
          styles.overlay,
          {
            flexDirection: isLandscape ? "row" : "column",
            justifyContent: isLandscape ? "space-around": "center",
          },
        ]}
      >
        <View>
          {type === "shortBreak" ? (
            <Typo size={verticalScale(isLandscape ? 150 : 72)}>☕</Typo>
          ) : (
            <Typo size={verticalScale(isLandscape ? 150 : 72)}>🌴</Typo>
          )}
        </View>
        <View style={{alignItems: "center"}}>
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

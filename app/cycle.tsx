import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import Stepper from "@/components/Stepper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { formatTime, useOrientation } from "@/utils/common";
import { verticalScale } from "@/utils/styling";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import {
  ArrowClockwiseIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getPomodoroSettings } from "../storage/pomodoroStorage";
import BreakOverlay from "./BreakOverlay";

const Cycle = () => {
  const { isLandscape } = useOrientation();

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [workDuration, setWorkDuration] = useState<number>(20 * 60);
  const [activeCycle, setActiveCycle] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayType, setOverlayType] = useState<"shortBreak" | "longBreak">(
    "shortBreak"
  );

  useEffect(() => {
    if ((isRunning && !isPaused) || overlayVisible) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [isRunning, isPaused, overlayVisible]);

  useEffect(() => {
    (async () => {
      const settings = await getPomodoroSettings();
      if (settings?.work) {
        setWorkDuration(0.1 * 60); // update to use settings
        setTimeLeft(0.1 * 60); // update to use settings
      }
    })();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsPaused(false);

      if (activeCycle < 4) {
        setActiveCycle(activeCycle + 1);
        startOverlay("shortBreak");
      } else if (activeCycle === 4) {
        setTimeLeft(workDuration);
        setIsRunning(false);
        setIsPaused(false);
        setActiveCycle(1);
        startOverlay("longBreak");
      } else {
        setTimeLeft(workDuration);
        setIsRunning(false);
        setIsPaused(false);
        setActiveCycle(1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, timeLeft, activeCycle, workDuration]);

  const startOverlay = (type: "shortBreak" | "longBreak") => {
    setOverlayType(type);
    setOverlayVisible(true);
  };

  const handleFinish = (isLongBreak: boolean) => {
    setOverlayVisible(false);
    if (isLongBreak) {
      resetTimer();
    } else if (activeCycle <= 4) {
      startTimer();
    } else {
      resetTimer();
    }
  };

  const startTimer = () => {
    setTimeLeft(workDuration);
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTimeLeft(workDuration);
    setIsRunning(false);
    setIsPaused(false);
    setActiveCycle(1);
  };

  return (
    <>
      <Header />
      <View
        style={{
          flexDirection: isLandscape ? "row" : "column",
          justifyContent: "space-around",
        }}
      >
        <View style={styles.timerContainer}>
          <View style={styles.timer}>
            <Typo size={60} color={colors.primary} fontWeight={"bold"}>
              {formatTime(timeLeft)}
            </Typo>
          </View>
        </View>
        <View>
          <View style={styles.cycleContainer}>
            <Stepper currentStep={activeCycle} />
          </View>
          <View style={styles.actionContainer}>
            {!isRunning && (
              <IconButton
                onPress={startTimer}
                icon={PlayIcon}
                color={colors.white}
                buttonStyle={styles.actionStyle}
                size={32}
              />
            )}
            {isRunning && !isPaused && (
              <IconButton
                onPress={pauseTimer}
                icon={PauseIcon}
                color={colors.white}
                buttonStyle={styles.actionStyle}
                size={32}
              />
            )}
            {isRunning && isPaused && (
              <IconButton
                onPress={resumeTimer}
                icon={ArrowClockwiseIcon}
                color={colors.white}
                buttonStyle={styles.actionStyle}
                size={32}
              />
            )}
            {(isRunning || isPaused) && (
              <IconButton
                onPress={resetTimer}
                icon={StopIcon}
                color={colors.white}
                buttonStyle={styles.actionStyle}
                size={32}
              />
            )}
          </View>
        </View>
      </View>
      <BreakOverlay
        visible={overlayVisible}
        onFinish={handleFinish}
        type={overlayType}
      />
    </>
  );
};

export default Cycle;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(250),
    width: verticalScale(250),
    padding: 32,
    borderWidth: 5,
    borderColor: colors.neutral400,
    borderRadius: verticalScale(125),
    borderCurve: "circular",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionStyle: {
    backgroundColor: colors.primary,
    padding: 10,
  },
  cycleContainer: {
    padding: 10,
    marginVertical: verticalScale(50),
    minWidth: verticalScale(350),
  },
});

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import Stepper from "@/components/Stepper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import {
  ArrowClockwiseIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPomodoroSettings } from "../storage/pomodoroStorage";

const Cycle = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [workDuration, setWorkDuration] = useState<number>(20 * 60);
  const [activeCycle, setActiveCycle] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const settings = await getPomodoroSettings();
      if (settings?.work) {
        setWorkDuration(0.1 * 60);
        setTimeLeft(0.1 * 60);
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
      // updatePomodoroHistory(workDuration); // ✅ Save cycle history
      if (activeCycle <= 4) {
        setActiveCycle(activeCycle + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, timeLeft, activeCycle]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Controls
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
    <SafeAreaView>
      <Header />
      <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <Typo size={60} color={colors.primary} fontWeight={"bold"}>
            {formatTime(timeLeft)}
          </Typo>
        </View>
      </View>
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
    </SafeAreaView>
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
    marginTop: verticalScale(24),
  },
  actionStyle: {
    backgroundColor: colors.primary,
    padding: 10,
  },
  cycleContainer: {
    padding: 10,
    marginVertical: verticalScale(50)
  }
});

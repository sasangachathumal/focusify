// SettingsSheet.tsx
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Typo from "@/components/Typo";
import { colors, spacingX } from "@/constants/theme";
import { PomodoroSettings } from "@/types";
import { formatTimeUnit, useOrientation } from "@/utils/common";
import { verticalScale } from "@/utils/styling";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { MinusIcon, PlusIcon } from "phosphor-react-native";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  getPomodoroSettings,
  savePomodoroSettings,
} from "../storage/pomodoroStorage";
import { showNotification } from "../utils/InAppNotifications";

const settingsSheet = forwardRef<BottomSheetModal>((_props, ref) => {
  const { isLandscape } = useOrientation();

  const snapPoints = useMemo(
    () => [Dimensions.get("window").height * (isLandscape ? 1 : 0.7)],
    [isLandscape]
  );

  const [cycleTime, setCycleTime] = useState(20);
  const [cycleBreakTime, setCycleBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(20);
  const [settingsUpdated, setSettingsUpdated] = useState(false);

  const minusCount = (type: string) => {
    switch (type) {
      case "cycleTime":
        if (cycleTime > 5) {
          setCycleTime(cycleTime - 5);
          setSettingsUpdated(true);
        }
        break;
      case "cycleBreak":
        if (cycleBreakTime > 5) {
          setCycleBreakTime(cycleBreakTime - 5);
          setSettingsUpdated(true);
        }
        break;
      case "longBreak":
        if (longBreakTime > 5) {
          setLongBreakTime(longBreakTime - 5);
          setSettingsUpdated(true);
        }
        break;
      default:
        break;
    }
  };

  const plusCount = (type: string) => {
    switch (type) {
      case "cycleTime":
        if (cycleTime < 60) {
          setCycleTime(cycleTime + 5);
          setSettingsUpdated(true);
        }
        break;
      case "cycleBreak":
        if (cycleBreakTime < 60) {
          setCycleBreakTime(cycleBreakTime + 5);
          setSettingsUpdated(true);
        }
        break;
      case "longBreak":
        if (longBreakTime < 60) {
          setLongBreakTime(longBreakTime + 5);
          setSettingsUpdated(true);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const init = async () => {
      const existing = await getPomodoroSettings();
      if (
        existing &&
        existing.work &&
        existing.shortBreak &&
        existing.longBreak
      ) {
        setCycleTime(existing.work);
        setCycleBreakTime(existing.shortBreak);
        setLongBreakTime(existing.longBreak);
      } else {
        const defaultSettings: PomodoroSettings = {
          work: cycleTime,
          shortBreak: cycleBreakTime,
          longBreak: longBreakTime,
        };
        await savePomodoroSettings(defaultSettings);
        console.log("Default Pomodoro settings saved.");
      }
    };
    init();
  }, []);

  const saveNewSettings = async () => {
    if (settingsUpdated) {
      const defaultSettings: PomodoroSettings = {
        work: cycleTime,
        shortBreak: cycleBreakTime,
        longBreak: longBreakTime,
      };
      await savePomodoroSettings(defaultSettings);
      console.log("Default Pomodoro settings updated.");
      showNotification(
        "success",
        "Updated!",
        "Default Pomodoro settings updated."
      );
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          {
            height: Dimensions.get("window").height * (isLandscape ? 1 : 0.7),
            padding: isLandscape ? spacingX._10 : spacingX._12,
          },
        ]}
      >
        <View style={[styles.titleConteiner, { gap: isLandscape ? 0 : 4 }]}>
          <Typo size={28} fontWeight={"bold"} color={colors.primary}>
            Settings
          </Typo>
          <Typo size={18} color={colors.primary}>
            update default settings of the app
          </Typo>
        </View>
        <View
          style={[
            {
              flexDirection: isLandscape ? "row" : "column",
              justifyContent: isLandscape ? "space-around" : "center",
              flexWrap: "wrap",
            },
          ]}
        >
          {/* cycle settings */}
          <View
            style={[
              styles.cycleSettings,
              {
                maxWidth:
                  Dimensions.get("window").width * (isLandscape ? 0.4 : 1),
                marginTop: verticalScale(isLandscape ? 0 : 8),
              },
            ]}
          >
            <Typo color={colors.primary} size={22} fontWeight={"bold"}>
              Cycle
            </Typo>
            <View style={styles.settingsButtonsContainer}>
              <IconButton
                onPress={() => minusCount("cycleTime")}
                weight="bold"
                icon={MinusIcon}
              />
              <Typo color={colors.primary} size={24}>
                {formatTimeUnit(cycleTime)} Min
              </Typo>
              <IconButton
                onPress={() => plusCount("cycleTime")}
                weight="bold"
                icon={PlusIcon}
              />
            </View>
          </View>
          {/* cycle breake settings */}
          <View
            style={[
              styles.cycleSettings,
              {
                maxWidth:
                  Dimensions.get("window").width * (isLandscape ? 0.4 : 1),
                marginTop: verticalScale(isLandscape ? 0 : 8),
              },
            ]}
          >
            <Typo color={colors.primary} size={22} fontWeight={"bold"}>
              Cycle Break
            </Typo>
            <View style={styles.settingsButtonsContainer}>
              <IconButton
                onPress={() => minusCount("cycleBreak")}
                weight="bold"
                icon={MinusIcon}
              />
              <Typo color={colors.primary} size={24}>
                {formatTimeUnit(cycleBreakTime)} Min
              </Typo>
              <IconButton
                onPress={() => plusCount("cycleBreak")}
                weight="bold"
                icon={PlusIcon}
              />
            </View>
          </View>
          {/* Long break setting */}
          <View
            style={[
              styles.cycleSettings,
              {
                maxWidth:
                  Dimensions.get("window").width * (isLandscape ? 0.4 : 1),
                marginTop: verticalScale(isLandscape ? 0 : 8),
              },
            ]}
          >
            <Typo color={colors.primary} size={22} fontWeight={"bold"}>
              Long Break
            </Typo>
            <View style={[styles.settingsButtonsContainer, {marginTop: verticalScale(isLandscape ? 4 : 8)}]}>
              <IconButton
                onPress={() => minusCount("longBreak")}
                weight="bold"
                icon={MinusIcon}
              />
              <Typo color={colors.primary} size={24}>
                {formatTimeUnit(longBreakTime)} Min
              </Typo>
              <IconButton
                onPress={() => plusCount("longBreak")}
                weight="bold"
                icon={PlusIcon}
              />
            </View>
          </View>
        </View>
        {/* Save Button */}
        <Button
          style={{ marginTop: verticalScale(16) }}
          disabled={!settingsUpdated}
          onPress={saveNewSettings}
        >
          <Typo>Save</Typo>
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

settingsSheet.displayName = "SettingsSheet";

export default settingsSheet;

const styles = StyleSheet.create({
  contentContainer: {},
  titleConteiner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cycleSettings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  settingsButtonsContainer: {
    paddingBottom: spacingX._12,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: verticalScale(32),
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral500,
  },
});

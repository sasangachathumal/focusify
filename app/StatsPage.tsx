import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { clearHistory, getPomodoroHistory } from "@/storage/pomodoroHistory";
import { verticalScale } from "@/utils/styling";
import { XIcon } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";
import {
  PomodoroHistory,
  PomodoroHistoryEntry,
  StatsPageProps,
} from "../types";

const StatsPage = ({ visible, onClose }: StatsPageProps) => {
  const [history, setHistory] = useState<PomodoroHistory>({});

  useEffect(() => {
    if (visible) {
      getPomodoroHistory().then((data) => setHistory(data));
    }
  }, [visible]);

  useEffect(() => {
  }, [history]);

  const clearStatsHistory = () => {
    clearHistory();
    getPomodoroHistory().then((data) => setHistory(data));
  };

  const renderItem = ([date, entry]: [string, PomodoroHistoryEntry]) => (
    <View style={styles.item}>
      <Typo color={colors.primaryDark} size={20} fontWeight="bold" style={{marginStart: verticalScale(24)}}>
        {date}
      </Typo>
      <View style={styles.detailContainer}>
        <View style={styles.detailBox}>
          <Typo color={colors.primaryDark} size={14} fontWeight="bold">
            Cycles
          </Typo>
          <Typo color={colors.primaryDark} size={14}>
            {entry.totalCycles}
          </Typo>
        </View>
        <View style={styles.detailBox}>
          <Typo color={colors.primaryDark} size={14} fontWeight="bold">
            Breaks
          </Typo>
          <Typo color={colors.primaryDark} size={14}>
            {entry.totalBreakMinutes} min
          </Typo>
        </View>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typo
            size={verticalScale(32)}
            fontWeight="bold"
            color={colors.primary}
          >
            Stats
          </Typo>
          <IconButton onPress={onClose} weight="bold" icon={XIcon} />
        </View>
        <FlatList
          data={Object.entries(history)}
          keyExtractor={([date]) => date}
          renderItem={({ item }) => renderItem(item)}
          contentContainerStyle={styles.list}
        />
        <View>
          <Button style={styles.clearButton} onPress={clearStatsHistory}>
            <Typo color={colors.white} fontWeight={"bold"}>
              CLEAR HISTORY
            </Typo>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default StatsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  list: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    justifyContent: "space-between",
  },
  detailContainer: {
    flexDirection: "row",
  },
  detailBox: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 8,
  },
  clearButton: {
    marginTop: verticalScale(16),
    backgroundColor: colors.primary,
  },
});

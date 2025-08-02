import { PomodoroHistory } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'pomodoroHistory';

export const updatePomodoroHistory = async (
  date: string,
  cycle: number,
  focusMinutes: number,
  breakMinutes: number
): Promise<void> => {
  try {
    const value = await AsyncStorage.getItem(HISTORY_KEY);
    const history: PomodoroHistory = value ? JSON.parse(value) : {};

    const entry = history[date] || {
      totalCycles: 0,
      totalFocusMinutes: 0,
      totalBreakMinutes: 0,
    };

    history[date] = {
      totalCycles: entry.totalCycles + cycle,
      totalFocusMinutes: entry.totalFocusMinutes + focusMinutes,
      totalBreakMinutes: entry.totalBreakMinutes + breakMinutes,
    };

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to update history', e);
  }
};

export const getPomodoroHistory = async (): Promise<PomodoroHistory> => {
  try {
    const value = await AsyncStorage.getItem(HISTORY_KEY);
    return value ? JSON.parse(value) : {};
  } catch (e) {
    console.error('Failed to load history', e);
    return {};
  }
};

import { PomodoroHistory } from '@/types';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();
const HISTORY_KEY = 'pomodoroHistory';

// Save or update entry for a specific date
export const updatePomodoroHistory = (
  date: string,
  cycle: number,
  focusMinutes: number,
  breakMinutes: number
): void => {
  const currentData = getPomodoroHistory();
  const existing = currentData[date] || {
    totalCycles: 0,
    totalFocusMinutes: 0,
    totalBreakMinutes: 0,
  };

  currentData[date] = {
    totalCycles: existing.totalCycles + cycle,
    totalFocusMinutes: existing.totalFocusMinutes + focusMinutes,
    totalBreakMinutes: existing.totalBreakMinutes + breakMinutes,
  };

  storage.set(HISTORY_KEY, JSON.stringify(currentData));
};

// Get full history
export const getPomodoroHistory = (): PomodoroHistory => {
  const value = storage.getString(HISTORY_KEY);
  if (value) {
    try {
      return JSON.parse(value) as PomodoroHistory;
    } catch (e) {
      console.error('Failed to parse Pomodoro history', e);
    }
  }
  return {};
};

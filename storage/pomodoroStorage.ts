import { PomodoroSettings } from '@/types';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const POMODORO_KEY = 'pomodoroSettings';

export const savePomodoroSettings = (settings: PomodoroSettings): void => {
  storage.set(POMODORO_KEY, JSON.stringify(settings));
};

export const getPomodoroSettings = (): PomodoroSettings | null => {
  const value = storage.getString(POMODORO_KEY);
  if (value) {
    try {
      return JSON.parse(value) as PomodoroSettings;
    } catch (e) {
      console.error('Failed to parse Pomodoro settings', e);
    }
  }
  return null;
};

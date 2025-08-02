import { PomodoroSettings } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'pomodoroSettings';

export const savePomodoroSettings = async (settings: PomodoroSettings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

export const getPomodoroSettings = async (): Promise<PomodoroSettings | null> => {
  try {
    const value = await AsyncStorage.getItem(SETTINGS_KEY);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Failed to load settings', e);
    return null;
  }
};

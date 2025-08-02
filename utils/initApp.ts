// utils/initApp.ts
import { PomodoroSettings } from '@/types';
import { getPomodoroSettings, savePomodoroSettings } from '../storage/pomodoroStorage';

export const initializePomodoroSettings = async () => {
  const existing = await getPomodoroSettings();

  if (!existing) {
    const defaultSettings: PomodoroSettings = {
      work: 20,
      shortBreak: 5,
      longBreak: 15,
    };
    await savePomodoroSettings(defaultSettings);
    console.log('Default Pomodoro settings saved.');
  } else {
    console.log('Pomodoro settings already exist.');
  }
};

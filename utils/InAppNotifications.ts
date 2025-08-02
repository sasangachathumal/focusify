import Toast from 'react-native-toast-message';

type NotificationType = 'success' | 'error' | 'info';

export const showNotification = (
  type: NotificationType,
  text1: string,
  text2?: string
) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};

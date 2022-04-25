/**
 * @format
 */


import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notificationConfigue } from './src/components/LocalNotification';
import { handleBackgroundMsg } from './src/helper/PushNotificationHelper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

notificationConfigue()
handleBackgroundMsg()

// GoogleSignin.configure({
//     webClientId: '278308056726-ldqq88sauois1l8kimgmvl2lmknmemmt.apps.googleusercontent.com',
// });
AppRegistry.registerComponent(appName, () => App);

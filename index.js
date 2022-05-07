/**
 * @format
 */


import { AppRegistry, LogBox, NativeModules } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notificationConfigue } from './src/components/LocalNotification';
import { handleBackgroundMsg } from './src/helper/PushNotificationHelper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const { RNTwitterSignIn } = NativeModules;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



RNTwitterSignIn.init('192BMW5B1GGD6dH1L6Awk016A', 'jxdoVgN65ZHnwU4ZtBJxC5V3CJNTT1DWo2aAya2ZpbtFpNeVMU').then(() =>
    console.log('Twitter SDK initialized'),
);

notificationConfigue()
handleBackgroundMsg()

// GoogleSignin.configure({
//     webClientId: '278308056726-ldqq88sauois1l8kimgmvl2lmknmemmt.apps.googleusercontent.com',
// });
AppRegistry.registerComponent(appName, () => App);

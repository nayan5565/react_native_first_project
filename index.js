/**
 * @format
 */


import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notificationConfigue } from './src/components/LocalNotification';
import { handleBackgroundMsg } from './src/helper/PushNotificationHelper';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

notificationConfigue()
handleBackgroundMsg()
AppRegistry.registerComponent(appName, () => App);

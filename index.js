/**
 * @format
 */


import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notificationConfigue } from './src/components/LocalNotification';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

notificationConfigue()
AppRegistry.registerComponent(appName, () => App);

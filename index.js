/**
 * @format
 */


import { AppRegistry, LogBox, NativeModules, Linking } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notificationConfigue } from './src/components/LocalNotification';
import { handleBackgroundMsg } from './src/helper/PushNotificationHelper';
import BackgroundService from 'react-native-background-actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import backgroundServer from './src/components/BackgroundService';
import TrackPlayer from 'react-native-track-player';
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
const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
        }
    });
};
const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};
// backgroundServer.start(veryIntensiveTask, options)
// backgroundServer.updateNotification('New ExampleTask description');

TrackPlayer.registerPlaybackService(() => require('./service'));

AppRegistry.registerComponent(appName, () => App);

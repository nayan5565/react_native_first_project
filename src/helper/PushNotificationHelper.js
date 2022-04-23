import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { handleNotification } from '../components/LocalNotification';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFcmToken()
    }
}

async function GetFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcm_token')
    if (!fcmToken) {
        try {
            fcmToken = await messaging().getToken();
            console.log('fcmToken===>', fcmToken)
            if (fcmToken) {
                console.log('fcmToken==>', fcmToken)
                await AsyncStorage.setItem('fcm_token', fcmToken)
            }
        } catch (error) {
            console.error('Error fcm token', error)
        }
    } else console.log('already token', fcmToken)
}

export const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'FCM Notification caused app to open from background state===>',
            remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'FCM Notification caused app to open from quit state===>',
                    remoteMessage.notification,
                );
                // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }

        });

    messaging().onMessage(async remoteMessage => {
        console.log('FCM Notification on forground state===>', remoteMessage)
        handleNotification(remoteMessage.notification.title, remoteMessage.notification.body)
    })
}

export const handleBackgroundMsg = () => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!==>', remoteMessage);
    });
}
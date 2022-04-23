
import { Alert } from "react-native";
import PushNotification from "react-native-push-notification";

export const notificationConfigue = () => {
    console.log('notificationConfigue')
    PushNotification.configure({
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION Local:", notification);

        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        // onRegistrationError: function (err) {
        //     console.error(err.message, err);
        // },
        //if you are not using remote notification or do not have Firebase installed, use this:
        requestPermissions: Platform.OS === 'ios'
        // requestPermissions: true,


    })
}

export const handleNotification = () => {
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "nayan",
        title: 'First',
        message: 'come notification export',
        id: 1,
        bigText: "My big text that will be shown when notification is expanded. Styling can be done using",
    });
}

export const handleScheduleNotification = () => {
    PushNotification.localNotificationSchedule({
        channelId: "nayan",
        title: 'schedule',
        message: 'come schedule notification',
        date: new Date(Date.now() + 20 * 1000), // in 20 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

        /* Android Only Properties */
        repeatTime: 4, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
}
export const cancelAllNotification = () => {
    PushNotification.cancelAllLocalNotifications()
}
export const cancelAllNotificationId = () => {
    PushNotification.cancelLocalNotification('123');
}

export const createChannel = () => {
    PushNotification.createChannel(
        {
            channelId: "nayan", // (required)
            channelName: "My nayan", // (required)

            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            //playSound: false, // (optional) default: true
            //soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            //importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            //vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
}

export const setRepeatingNotification = (interval) => {
    PushNotification.cancelAllLocalNotifications()
    if (interval == "every 30 seconds") {
        PushNotification.localNotificationSchedule({
            title: "My notification title",
            message: "My notification message",
            date: new Date(Date.now() + 30 * 1000), // first trigger in 30 secs
            channelId: 'DemoAppID',
            repeatType: 'time',
            repeatTime: 30 * 1000 // repeats every 30 seconds (value has to be defined in miliseconds when the repeatType is 'time')
        });
        Alert.alert("Successful!", "Your notification is coming in 30 seconds and will repeat itself every 30 seconds.")
    }
    else if (interval == "once in two days") {
        PushNotification.localNotificationSchedule({
            title: "My notification title",
            message: "My notification message",
            date: new Date(Date.now() + 10 * 1000), // first trigger in 10 secs
            channelId: 'DemoAppID',
            repeatType: 'day',
            repeatTime: 2, // repeats every 2 days
        });
        Alert.alert("Successful!", "Your notification is coming in 10 seconds and will repeat itself once in two days.")
    }
    else if (interval == "once a week") {
        PushNotification.localNotificationSchedule({
            title: "My notification title",
            message: "My notification message",
            date: new Date(Date.now() + 10 * 1000), // first trigger in 10 secs
            channelId: 'DemoAppID',
            repeatType: 'week',
            repeatTime: 1 // repeats every week
        });
        Alert.alert("Successful!", "Your notification is coming in 10 seconds and will repeat itself every week.")
    }
}

export const notificationSpecifiqueTime = () => {
    var trigger = new Date();
    trigger.setDate(trigger.getDate());
    trigger.setHours(12);
    trigger.setMinutes(6);
    trigger.setMilliseconds(0);
    console.log('trigger==>', trigger)
    PushNotification.localNotificationSchedule({
        message: "Your Daily Schedule is Ready.", // (required)
        date: trigger, // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
}


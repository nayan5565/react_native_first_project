
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createChannel, handleNotification, handleScheduleNotification, notificationSpecifiqueTime, cancelAllNotification, setRepeatingNotification } from '../components/LocalNotification';
import fonts from '../constants/fonts';
import GlobalStyle from '../constants/GlobalStyle';




const PushNotificationScreen = (props) => {


    useEffect(() => {
        createChannel()
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{ backgroundColor: 'teal', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 }}
                onPress={() => handleNotification()}>
                <Text style={{ color: 'white', fontFamily: fonts.mySoul }}> Fire notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={GlobalStyle.bottomCard} onPress={() => { notificationSpecifiqueTime() }}>
                <Text style={GlobalStyle.whiteText}>SpecificTime</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'teal', borderRadius: 12, marginTop: 12, paddingHorizontal: 16, paddingVertical: 12 }}
                onPress={() => handleScheduleNotification()}>
                <Text style={{ color: 'white', fontFamily: fonts.mySoul }}> Fire schedule notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={() => { setRepeatingNotification("every 30 seconds") }}>
                <Text style={{ fontFamily: fonts.dancingMedium }}>every 30 seconds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => { setRepeatingNotification("once in two days") }}>
                <Text style={{ fontFamily: fonts.dancingBold }}>once in two days</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => { setRepeatingNotification("once a week") }}>
                <Text style={{ fontFamily: fonts.dancingRegular }}>once a week</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => { cancelAllNotification() }}>
                <Text style={{ fontFamily: 'DancingScript-SemiBold' }}>cancel all notifications</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PushNotificationScreen;
const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButton: {
        padding: 5,
        backgroundColor: '#CDF2CA',
        borderRadius: 5,
        margin: 10
    },
    secondaryButton: {
        padding: 5,
        backgroundColor: '#ffc2c2',
        borderRadius: 5,
        margin: 10
    }
});

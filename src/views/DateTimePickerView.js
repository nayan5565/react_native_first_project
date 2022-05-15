import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Snackbar } from 'react-native-paper';

function DateTimePickerView() {

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [friday, setFriday] = useState(false)
    const [text, setText] = useState('empty')
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(true);

    const onDismissSnackBar = () => setVisible(false);

    const showToast = () => {
        ToastAndroid.show("You can not select friday", ToastAndroid.SHORT);
    };

    const onChange = (event, selectedDate) => {
        console.log('event', event.type)
        if (event.type === 'set') {
            if (selectedDate.getDay() != '5') {
                setFriday(false)
                const currentDate = selectedDate || date
                setShow(Platform.OS === 'ios')
                setDate(currentDate)
                let tempDate = new Date(currentDate)
                let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
                let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes()
                setText(fDate + '\n' + fTime)
                console.log(fDate + '(' + fTime + ')')
            }
            else {

                setFriday(true)
                showToast()
                console.log('you can not select friday')
            }
        } else {
            console.log('you cancel')
        }


    }

    const showMode = (currentMode) => {
        console.log('date', date)
        setDate(new Date(date))
        setShow(true)
        setMode(currentMode)
    }



    return (
        <View style={{ flex: 1 }}>

            <Button title='Date Picker' onPress={() => showMode('date')} />
            <Button title='Time Picker' onPress={() => showMode('time')} />
            <Text style={{ textAlign: 'center', margin: 12, fontSize: 16 }}>Select date time: {text}</Text>

            {show && (<DateTimePicker
                testID='datetimepicker'
                value={date}
                minimumDate={new Date()}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}
            />)}
            <Snackbar
                visible={visible}

                onDismiss={onDismissSnackBar}
            >
                Hey there! I'm a Snackbar.
            </Snackbar>
        </View>
    );
}

export default DateTimePickerView;
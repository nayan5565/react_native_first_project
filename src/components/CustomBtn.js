import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomBtn = ({ onPress = () => { }, btnStyle = {}, txtStyle = {}, btnText }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...style.btnStyle, ...btnStyle }}>
            <Text style={{ ...txtStyle }}>{btnText}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth: 1
    }
})

export default CustomBtn;
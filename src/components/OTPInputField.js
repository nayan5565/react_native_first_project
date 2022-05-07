import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import OTPTextInput from "react-native-otp-textinput";

const OTPInputField = (props) => {
    const otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <OTPTextInput ref={otpInput} inputCount='6' containerStyle={{ border: 1, borderRadius: 6 }} />
            <View style={{ margin: 12 }} />
            <Button title="clear" onPress={() => clearText()}></Button>
        </View>
    );
}

export default OTPInputField;
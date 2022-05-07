import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import GlobalStyle from "../constants/GlobalStyle";

const PhoneInputField = () => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SafeAreaView >
                    {showMessage && (
                        <View >
                            <Text>Value : {value}</Text>
                            <Text>Formatted Value : {formattedValue}</Text>
                            <Text>Valid : {valid ? "true" : "false"}</Text>
                        </View>
                    )}

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="BD"
                        // layout="first"
                        layout="second"
                        containerStyle={{
                            marginVertical: 8,
                            borderRadius: 12,
                            width: '80%',
                            height: 50,
                            backgroundColor: 'white'
                        }}
                        textInputStyle={{ fontSize: 16 }}
                        textContainerStyle={{ paddingVertical: 0, borderRadius: 12, }}
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        // withDarkTheme
                        withShadow
                        autoFocus
                    />


                    <TouchableOpacity
                        style={GlobalStyle.bottomCard}
                        onPress={() => {
                            const checkValid = phoneInput.current?.isValidNumber(value);
                            setShowMessage(true);
                            setValid(checkValid ? checkValid : false);
                        }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Check</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </>
    );

}

export default PhoneInputField;
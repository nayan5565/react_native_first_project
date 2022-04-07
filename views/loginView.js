import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import customStyle from '../customStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginView = ({ navigation }) => {

    const [phone, onChangePhone] = useState("");
    const [password, onChangePassword] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const onLogin = async (email, password) => {
        if (email == null || password == null) {
            alert('enter phone and password');
            return false;
        }
        setLoading(true)
        console.log('Email: ' + email + 'pass: ' + password);
        loginApi()
        // getMovies2()
    };

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('isLogin', JSON.stringify(value))
        } catch (e) {
            console.log(e)
            // saving error
        }
    }

    const storeDataObject = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    const getDataObject = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }


    const loginApi = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "medium": "phone",
            "emailOrPhone": "+88" + phone,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // fetch("https://ctapi.shadhinlab.xyz/dev/auth/authentication/signin", requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log('Login res: ' + JSON.stringify(response)))
        // .then(result => changeScreen(result.data))
        //     .catch(error => console.log('error', error)).finally(() => setLoading(false));
        try {
            const response = await fetch("https://kjggeg8yjl.execute-api.us-west-2.amazonaws.com/qa/auth/authentication/signin", requestOptions);
            const result = await response.json();
            if (response.status == 200) {
                // console.log('Login res: ' + JSON.stringify(result.data));
                changeScreen(result.data)
            } else {
                alert(result.message)
            }

        } catch (error) {
            console.log('Login err: ' + JSON.stringify(error));
            alert(error)

        } finally {
            setLoading(false);
        }

    }
    const changeScreen = (loginData) => {
        // setUserData(loginData)
        console.log("userData: " + JSON.stringify(loginData))
        storeData(true)
        navigation.replace('Database', {
            users: loginData,
        });
    }

    const goSignupView = () => {
        storeData(true)
        navigation.navigate('Signup');
    }

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        if (isMounted) {

        }
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, []);
    return (
        <View style={customStyle.container}>

            <TextInput
                style={customStyle.input}
                onChangeText={onChangePhone}
                placeholder="Phone"
                returnKeyType='next'
                keyboardType="phone-pad"
                value={phone}
            />
            <TextInput
                style={customStyle.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
            />

            <TouchableOpacity style={isLoading ? customStyle.DisableButtonStyle : customStyle.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={() => isLoading ? null : onLogin(phone, password)}>

                {isLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.TextStyle}>Login</Text>}

            </TouchableOpacity>

            <Text onPress={() => goSignupView()} style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Create New Account</Text>
        </View>


    );
};

const styles = StyleSheet.create({

    button: {
        margin: 10,
        padding: 12,
        alignItems: "center",
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
});

export default LoginView;
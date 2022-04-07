import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import customStyle from '../customStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashView = ({ navigation }) => {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('isLogin')
            if (value !== null) {
                var login = JSON.parse(value)
                console.log('Sp: ' + login)
                if (login) {
                    navigation.replace('Landing', { data: value });
                } else navigation.replace('Login');

            } else navigation.replace('Login');
        } catch (e) {
            console.log('Sp: ' + JSON.stringify(e))
            // navigation.navigate('Login');
        }
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <View style={customStyle.splashContainer}>
            <ActivityIndicator size='large' color='white' />

        </View>
    );
}

export default SplashView;
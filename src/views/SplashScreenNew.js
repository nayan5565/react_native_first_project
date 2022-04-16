import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import imagePath from '../constants/imagePath';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';

function SplashScreenNew({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image animation='bounceInRight' style={styles.logo} source={imagePath.imgBanner} resizeMode='stretch' />
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={styles.title}>Stay connected with everyone</Text>
                <Text style={styles.text}>Signin with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signin}
                        activeOpacity={.5}
                        onPress={() => navigation.navigate('Login')}>

                        <Text style={styles.textSignin}>Signin</Text>
                        <MaterialIcons name='navigate-next' color='#fff' size={20} />

                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SplashScreenNew;
const { height } = Dimensions.get('screen')
const height_logo = height * 0.28
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        marginTop: 6,
        color: 'grey',
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signin: {
        width: 150,
        height: 40,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSignin: {
        fontWeight: 'bold',
        color: 'white',
    },


})
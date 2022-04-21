import React from 'react';
import { View } from 'react-native';
import GlobalStyle from '../constants/GlobalStyle';
import CustomBtn from './CustomBtn';

function FirebaseAuthDesign({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 16 }}>
            <CustomBtn
                btnStyle={GlobalStyle.bottomCard}
                txtStyle={GlobalStyle.whiteText}
                btnText="Phone Login"
                onPress={() => navigation.navigate('PhoneOTP')}
            />
            <View style={{ marginTop: 16 }} />
            <CustomBtn
                btnStyle={GlobalStyle.bottomCard}
                txtStyle={GlobalStyle.whiteText}
                btnText="Sign With email"
                onPress={() => navigation.navigate('SignEmail')}
            />
        </View>
    );
}

export default FirebaseAuthDesign;
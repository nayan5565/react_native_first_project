import React, { useEffect, useState } from "react";
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { users, otherParam } = route.params;
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('isLogin')
            var login = JSON.parse(value)
            if (value !== null) {
                // value previously stored
                alert(login)
            } else alert(login)
        } catch (e) {
            alert(e)
            // error reading value
        }
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ItemId: {users.name}</Text>
            {/* <Text>ItemId: {JSON.stringify(itemId)}</Text> */}
            <Text>Other: {otherParam}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.navigate('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })
                }
            />
        </View>
    );
}

export default DetailsScreen;
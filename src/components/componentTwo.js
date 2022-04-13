import React from 'react';
import { View, Text } from 'react-native';

function ComponentTwo(props) {
    return (
        <View>
            <Text>Name: {props.name}</Text>
            <Text>City: {props.city}</Text>
        </View>
    );
}

export default ComponentTwo;
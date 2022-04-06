import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ComponentThree extends Component {
    render() {
        return (
            <View>
                <Text>Name: {this.props.name}</Text>
                <Text>City: {this.props.city}</Text>
            </View>
        );
    }

}

export default ComponentThree;
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homeScreenNew from '../views/homeScreenNew';
import SettingsScreen from '../views/SettingsScreen';
import { Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MyTab(props) {
    return (
        <Tab.Navigator screenOptions={{ tabBarBounces: true, }}>
            <Tab.Screen name="Home" component={homeScreenNew} options={{
                title: ({ color, focused }) =>
                    <Ionicons
                        size={25}
                        name={focused ? 'home' : 'home-outline'}
                        color={color} />
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarBadge: () => { return (<Text>3</Text>) } }} />
        </Tab.Navigator >
    );
}

export default MyTab;
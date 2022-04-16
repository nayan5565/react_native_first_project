import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginView from '../views/loginView';
import SignupView from '../views/signupView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChangeData from '../views/changeData';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
function MyBottomTab(props) {
    const { counter } = useSelector((state) => state.counter)
    return (
        <Tab.Navigator initialRouteName="Counter" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Counter') {
                    iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                } else if (route.name === 'Signup') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { position: 'absolute', backgroundColor: 'white' }
        })}>
            <Tab.Screen name="Counter" component={ChangeData} options={{ tabBarBadge: counter }} />
            <Tab.Screen name="Signup" component={SignupView} />
        </Tab.Navigator>
    );
}

export default MyBottomTab;
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import MapScreen from '../views/MapScreen';
import DatabaseView from '../views/databaseView';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (

        <Drawer.Navigator initialRouteName="Signup" useLegacyImplementation='false'>
            <Drawer.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Database" component={DatabaseView} options={{ headerShown: false }} />
        </Drawer.Navigator>


    );
}

export default MyDrawer;
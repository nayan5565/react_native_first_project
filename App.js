import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingView from './src/views/landingView';
import HomeScreen from './src/views/homeScreen';
import DetailsScreen from './src/views/detailsScreen';
import ListItemView from './src/views/listItemView';
import ApiCallView from './src/views/apiCallView';
import ApiCallInFunctionComponent from './src/views/apiCallInFunctionComponent';
import LoginView from './src/views/loginView';
import DatabaseView from './src/views/databaseView';
import SplashView from './src/views/splashView';
import UtilsView from './src/views/utilsView';
import { Provider } from 'react-redux';
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from 'redux';
import homeScreenNew from './src/views/homeScreenNew';
import friendsScreen from './src/views/friendsScreen';
import allReducers from './src/redux/reducer/allReducer';
import SignupView from './src/views/signupView';
import ChangeData from './src/views/changeData';
import MapScreen from './src/views/MapScreen';
import ChooseLocation from './src/views/ChooseLocation';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import MyDrawer from './src/components/MyDrawer';
// import SQLite from 'react-native-sqlite-storage';

// global.db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default',
//         createFromLocation: '~SQLite.db',
//     },
//     () => { },
//     error => {
//         console.log("ERROR: " + error);
//     }
// );

const store = createStore(allReducers, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashView} options={{ headerShown: false }} />
            <Stack.Screen name="Redux" component={homeScreenNew} />
            <Stack.Screen name="Drawer" component={MyDrawer} />
            <Stack.Screen name="Signup" component={SignupView} options={{ headerShown: false }} />
            <Stack.Screen name="Friends" component={friendsScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Database" component={DatabaseView} />
            <Stack.Screen name="ReduxHook" component={ChangeData} />
            <Stack.Screen name="List" component={ListItemView} />
            <Stack.Screen name="Landing" component={LandingView} />
            <Stack.Screen name="Api" component={ApiCallView} />
            <Stack.Screen name="Utils" component={UtilsView} />
            <Stack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
            <Stack.Screen name="ApiFunc" component={ApiCallInFunctionComponent} />
          </Stack.Navigator>
          <FlashMessage position='top' />
        </NavigationContainer>
      </Provider>

    );
  }
}

export default App;
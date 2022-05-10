import React, { Component, useEffect } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
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
import MyBottomTab from './src/components/MyBottomTab';
import CustomBottomTab from './src/components/CustomBottomTab';
import MyTab from './src/components/MyTab';
import OnBoarding from './src/components/OnBoarding';
import MyBottomSheet from './src/components/MyBottomSheet';
import BarCodeScannerScreen from './src/views/BarCodeScannerScreen';
import PushNotificationScreen from './src/views/PushNotificationScreen';
import DownloadFileScreen from './src/views/DownloadFileScreen';
import PhoneOtpScreen from './src/views/PhoneOtpScreen';
import FirebaseAuthDesign from './src/components/FirebaseAuthDesign';
import SignEmailScreen from './src/views/SignEmailScreen';
import { requestUserPermission, NotificationListner } from './src/helper/PushNotificationHelper';
import GoogleSigninScreen from './src/views/GoogleSigninScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FBLoginScreen from './src/views/FBLoginScreen';
import TwitterSigin from './src/views/TwitterSigin';
import PhoneInputField from './src/components/PhoneInputField';
import OTPInputField from './src/components/OTPInputField';
import AudioPlayerView from './src/views/AudioPlayerView';
import VideoPlayeView from './src/views/VideoPlayeView';
import PickFileView from './src/views/PickFileView';
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
const App = () => {

  useEffect(() => {
    requestUserPermission()
    NotificationListner()
    GoogleSignin.configure(
      //   {
      //   webClientId: '278308056726-ldqq88sauois1l8kimgmvl2lmknmemmt.apps.googleusercontent.com',
      // }
    );
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashView} options={{ headerShown: false }} />
          <Stack.Screen name="Redux" component={homeScreenNew} />
          <Stack.Screen name="FirebaseAuthDesign" component={FirebaseAuthDesign} />
          <Stack.Screen name="SignEmail" component={SignEmailScreen} />
          <Stack.Screen name="FBLogin" component={FBLoginScreen} />
          <Stack.Screen name="OTP" component={OTPInputField} />
          <Stack.Screen name="AudioPlayer" component={AudioPlayerView} />
          <Stack.Screen name="PickFile" component={PickFileView} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayeView} />
          <Stack.Screen name="Twitter" component={TwitterSigin} />
          <Stack.Screen name="PhoneOTP" component={PhoneOtpScreen} />
          <Stack.Screen name="Download" component={DownloadFileScreen} />
          <Stack.Screen name="PhoneField" component={PhoneInputField} />
          <Stack.Screen name="Google" component={GoogleSigninScreen} />
          <Stack.Screen name="PushNotification" component={PushNotificationScreen} />
          <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTab" component={MyBottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="CustomBottomTab" component={CustomBottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="TabBar" component={MyTab} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupView} options={{ headerShown: false }} />
          <Stack.Screen name="OnBoard" component={OnBoarding} />
          <Stack.Screen name="BottomSheet" component={MyBottomSheet} />
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

export default App;
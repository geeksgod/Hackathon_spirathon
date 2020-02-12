import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from 'react-native'

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen';
import SplashScreen from './src/screens/SplashScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import EmmergencyScreen from './src/screens/EmmergencyScreen';
import PriceListScreen from './src/screens/PriceListScreen';

const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  loginFlow: createStackNavigator(
    {
      Login: LoginScreen,
      Signin: SignInScreen,
    },
    {headerMode: 'none'},
  ),
  mainFlow: createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
          <Image style={{height:30}} source={require('./src/images/home_.png')} />
          ),
        },
      },
      Activity: {
        screen: ActivityScreen,
        navigationOptions: {
          tabBarLabel: 'Activity',
          tabBarIcon: ({tintColor}) => (
            <Image style={{height:30}} source={require('./src/images/activity_.png')} />
          ),
        },
      },
      //Share: ShareScreen,
      Emmergency: {
        screen: EmmergencyScreen,
        navigationOptions: {
          tabBarLabel: 'Emmergency',
          tabBarIcon: ({tintColor}) => (
            <Image style={{height:30}} source={require('./src/images/phone_.png')} />
          ),
        },
      },
      //Transportation: TransportationScreen,
      PriceList: {
        screen: PriceListScreen,
        navigationOptions: {
          tabBarLabel: 'Price List',
          tabBarIcon: ({tintColor}) => (
            <Image style={{height:30}} source={require('./src/images/price_.png')} />
          ),
        },
      },
    },
    {
      order: ['Home', 'Activity', 'PriceList','Emmergency'],
      tabBarOptions: {
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
        showIcon:true,
        showLabel:true,
        style: {
          backgroundColor: 'white',
          fontSize:14
        },
      },
    },
  ),
});

export default createAppContainer(switchNavigator);

//"react-native-firebase": "^5.6.0",

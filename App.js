import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import Loading from './screens/Loading';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();


import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';


var firebaseConfig = {
  apiKey: "AIzaSyD-cR2UZqDDHPbVoMwzNAYYN5KrT2ObrQ8",
  authDomain: "shopr-app-1e5ef.firebaseapp.com",
  databaseURL: "https://shopr-app-1e5ef.firebaseio.com",
  projectId: "shopr-app-1e5ef",
  storageBucket: "shopr-app-1e5ef.appspot.com",
  messagingSenderId: "303548181587",
  appId: "1:303548181587:web:7c0d2fe1691165ad2eaaa6",
  measurementId: "G-1KW8SVEJJF"
};

// Initialize Firebase

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
      }

const AppTabNavigator = createBottomTabNavigator (
  {
    Home: {
    screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={24} color={tintColor} />
    }
},

  Profile : {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="ios-person" size={24} color={tintColor} />
      }
  }
});

const AuthStack = createStackNavigator({
  Login: Login,
  Register : Register
})

export default createAppContainer (
  createSwitchNavigator(
    {
    Loading: Loading,
    App: AppTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: "Loading"
  }
  )
);



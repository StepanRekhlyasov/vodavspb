import React, { useEffect } from "react";
import Main from "./Screens/Main";
// import Map from "./Screens/Map";
import Cart from "./Screens/Cart";
import Catalog from "./Screens/Catalog";
import Profile from "./Screens/Profile";
import Category from "./Screens/Category";
import Product from "./Screens/Product";
import PhoneNumber from "./Screens/PhoneNumber";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

/** Navigators */
import MyTabs from './navigation/Tabs'
import DrawerNavigator from './navigation/Drawer'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Otp from "./Screens/Otp";
import Authorization from "./Screens/Authorization";

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Navigate() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}

// const mapStateToProps = (state : any) => {
//   const { total, addresses } = state
//   return { total, addresses }
// };

// const mapDispatchToProps = (dispatch : any) => ({
//   actions: bindActionCreators({
//       // saveProducts
//   }, dispatch),
// });

export default Navigate
import React from "react";
import Main from "./Screens/Main";
import Cart from "./Screens/Cart";
import Catalog from "./Screens/Catalog";
import Profile from "./Screens/Profile";
import Category from "./Screens/Category";
import Product from "./Screens/Product";
import PhoneNumber from "./Screens/PhoneNumber";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Otp from "./Screens/Otp";
import Gated from "./Screens/Gated";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MyTabs({total} : any) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Главная" component={Main} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Shop" component={MyCatalog} 
        options={{
          headerShown:false, title: "Каталог",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="water-check-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Корзина" component={Cart} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart-variant" color={color} size={size} />
        ),
        tabBarBadge: total?total:null,
      }} />
      <Tab.Screen name="Профиль" component={MyProfile} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-box" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

function MyCatalog() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Каталог" component={Catalog} />
      <Stack.Screen name="Category" component={Category} options={({ route } : any) => ({ title: route.params.title })} />
      <Stack.Screen name="Product" component={Product} options={({ route } : any) => ({ title: route.params.title })} />
    </Stack.Navigator>
  );
}

function MyProfile(){
  return(
    <Stack.Navigator>
        { 0 ? (
            <Tab.Screen name="Профиль" component={Profile} options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-box" color={color} size={size} />
              ),
            }}/>
          ) : (
            <Tab.Screen name="Авторизация" component={PhoneNumber} options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-box" color={color} size={size} />
              ),
            }}/>
          )
        }
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Gated" component={Gated} />
    </Stack.Navigator>
  )
}

function Navigate({total} : any) {
  return (
    <NavigationContainer>
      <MyTabs total={total} />
    </NavigationContainer>
  );
}

const mapStateToProps = (state : any) => {
  const { total } = state
  return { total }
};

const mapDispatchToProps = (dispatch : any) => ({
  actions: bindActionCreators({
      // saveProducts
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigate)
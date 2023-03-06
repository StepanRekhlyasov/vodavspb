import React, { useEffect } from "react";
import Main from "../Screens/Main";
// import Map from "../Screens/Map";
import Cart from "../Screens/Cart";
import History from "../Screens/History";
import Catalog from "../Screens/Catalog";
import Profile from "../Screens/Profile";
import Category from "../Screens/Category";
import Product from "../Screens/Product";
import PhoneNumber from "../Screens/PhoneNumber";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Otp from "../Screens/Otp";
import Gated from "../Screens/Gated";
// import Header from "../components/Parts/Burger";
/** Icons */
import { Feather, Octicons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabsNavigator ({cart} : any) {
	const total = cart.reduce((accumulator : number, currentValue : { count: number })=>{return accumulator + currentValue.count}, 0)
    return (
        <Tab.Navigator
			screenOptions={{
				tabBarStyle: { 
					paddingBottom: 70,
					paddingTop: 17
				},
				tabBarItemStyle: {
					height: 48
				},
		  	}}
		>
            <Tab.Screen name="Главная" component={MyCatalog} options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
					<Feather name="list" color={color} size={size} />
                ),
            }}/>
			<Tab.Screen name="Корзина" component={Cart} options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
					<Feather name="shopping-cart" color={color} size={size} />
                ),
                tabBarBadge: total?total:null,
            }} />
			<Tab.Screen name="История" component={History} options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
					<Octicons name="history" color={color} size={size} />
                ),
            }} />
            {/* <Tab.Screen name="Shop" component={MyCatalog} 
                options={{
					headerShown:false, title: "Каталог",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="water-check-outline" color={color} size={size} />
					),
                }}
            /> */}
            <Tab.Screen name="Профиль" component={MyProfile} options={{
                headerShown:false,
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
        <Stack.Screen name="Каталог" component={Main} options={{headerShown:false}} />
        <Stack.Screen name="Category" component={Category} options={({ route } : any) => ({ title: route.params.title })} />
        <Stack.Screen name="Product" component={Product} options={({ route } : any) => ({ title: route.params.title })} />
      </Stack.Navigator>
    );
}

function MyProfile(){
    return(
        <Stack.Navigator>
            { 1 ? (
                <Tab.Screen name="Profile" component={Profile} options={{
                  headerShown:false,
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
          <Stack.Screen name="Map" component={Map} options={{
            headerShown:false,
          }}
          />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Gated" component={Gated} />
      </Stack.Navigator>
    )
}

function MyMap(){
  return (
    <Stack.Navigator>
        <Stack.Screen name="MapLock" component={Map} options={{
          headerShown:false,
        }}
        />
    </Stack.Navigator>
  )
}

const mapStateToProps = (state : any) => {
  const { cart, addresses } = state
  return { cart, addresses }
};

const mapDispatchToProps = (dispatch : any) => ({
  actions: bindActionCreators({
      // saveProducts
  }, dispatch),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(TabsNavigator)
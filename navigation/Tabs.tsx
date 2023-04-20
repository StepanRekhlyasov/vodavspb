import React from "react";
import Main from "../Screens/Main";
import Map from "../Screens/Map";
import Cart from "../Screens/Cart";
import History from "../Screens/History";
import Profile from "../Screens/Profile";
import Category from "../Screens/Category";
import Product from "../Screens/Product";
import PhoneNumber from "../Screens/PhoneNumber";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Otp from "../Screens/Otp";
import Authorization from "../Screens/Authorization";
/** Icons */
import { Feather, Octicons, AntDesign } from '@expo/vector-icons'; 
import Checkout from "../Screens/Checkout";
import AddressList from "../components/Address/AddressList";


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
            <Tab.Screen name="Главная" component={MyCatalog} 
				options={{
					headerShown:false,
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen name="Cart" component={MyCart} 
				options={{
					headerShown:false,
					tabBarIcon: ({ color, size }) => (
						<Feather name="shopping-cart" color={color} size={size} />
					),
					tabBarBadge: total?total:null,
				}} 
			/>
			<Tab.Screen name="История" component={History} options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
					<Octicons name="history" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="MyProfile" component={MyProfile} options={{
				tabBarLabel: 'Профиль',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                	<MaterialCommunityIcons name="account-box" color={color} size={size} />
                ),
            }}/>
        </Tab.Navigator>
    );
}
function MyCart(){
	return (
		<Stack.Navigator>
			<Stack.Screen name="Корзина" component={Cart} options={{headerShown:false}} />
			<Stack.Screen name="Checkout" component={Checkout} options={
				{
					headerShown:true,
					title: 'Оформление заказа'
				}} />
		</Stack.Navigator>
	)
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
                <Tab.Screen name="Профиль" component={Profile} options={{
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
			<Stack.Screen name="Otp" component={Otp} />
			
			{/* <Stack.Screen name="Выбор адреса" component={AddressList} options={{headerShown:true}} /> */}
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
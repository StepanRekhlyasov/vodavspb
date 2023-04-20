import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyTabs from './Tabs'
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
/** Components */
import Burger from "../components/Parts/Burger";
import AddressHeader from "../components/Address/AddressHeader";
/** Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/** Cross-navigation */
import { useNavigation, useNavigationState, useRoute } from "@react-navigation/native";
import * as tabNavigator from '../navigator';
import AddressList from "../components/Address/AddressList";
import Exit from "../components/Functional/Exit";
import Map from "../Screens/Map";
import Authorization from "../Screens/Authorization";


const Drawer = createDrawerNavigator();

const urls = [
    {
        text : 'Профиль'
    }
]


const DrawerNavigator = ({parts, screen, user} : any) => {
	const [headerTitle, setTitle] = useState(true)
	const [initialScreen, changeScreen] = useState('Главная')
	const [headerRight, setHeaderRight] = useState(<Burger/>)
	const [headerLeft, setHeaderLeft] = useState(<AddressHeader/>)

	const navigation : any = useNavigation()
	
	const Item = (item : any) => (
		<Pressable onPress={()=>{
			navigation.navigate('MyTabs', {
				screen: 'Профиль'
			})
		}}>
			<Text style={{fontWeight: 'bold'}}>{item.data.item.text}</Text>
		</Pressable>
	);

    useEffect(()=>{
		setupHeader()
    }, [screen, user])

	/** обработчик хедера при изменении экрана */
	function setupHeader(){
		/** скрыть главный хедер */
		if(['Authorization', 'Category', 'Checkout', 'Выбор адреса', 'Map'].includes(screen)){
			setTitle(false)
			return
		} else {
			setTitle(true)
			/** левая часть */
			if(['Профиль'].includes(screen)){
				setHeaderLeft(<Text style={styles.headerTitle}>Данные профиля</Text>)
				if(user.is_auth){
					setHeaderRight(<Exit/>)
				} else {
					setHeaderRight(<Burger/>)
				}
				return
			}
			if(['История', 'Корзина'].includes(screen)){
				setHeaderLeft(<Text style={styles.headerTitle}>{screen}</Text>)
				setHeaderRight(<Burger/>)
				return
			}
			if(['AddressList'].includes(screen)){
				setHeaderLeft(<Text style={styles.headerTitle}>Выберите адрес:</Text>)
				setHeaderRight(<></>)
				return
			}
			if(['Main'].includes(screen)){
				setHeaderLeft(<AddressHeader/>)
				setHeaderRight(<Burger/>)
				return
			}
		}
	}

    return (
        <Drawer.Navigator 
			screenOptions={{ drawerPosition: 'right', }}
            drawerContent={ (navigation) =>
                <View style={styles.wrapper}>
                    <FlatList
                        data={urls}
                        renderItem={ (item) => <Item data={item} navigation={navigation}/> }
                    />
                </View>
            }
        >
            <Drawer.Screen 
			name="MyTabs" 
			component={MyTabs}   
			options={{
				swipeEnabled : false,
                headerRight: () => headerRight,
				headerLeft: () => headerLeft,
                headerStyle: {borderBottomWidth: 0, backgroundColor: '#F5F5F5', borderColor: 'red'},
                title: '',
				headerShown: headerTitle,
            }} />
            <Drawer.Screen 
			name="AddressList" 
			component={AddressList}   
			options={{
				swipeEnabled : false,
                headerRight: () => headerRight,
				headerLeft: () => headerLeft,
                headerStyle: {borderBottomWidth: 0, backgroundColor: '#F5F5F5', borderColor: 'red'},
                title: '',
				headerShown: headerTitle,
            }} />
			<Drawer.Screen name="Map" component={Map} options={{
				headerShown:false,
			}}
			/>
			<Drawer.Screen name="Authorization" component={Authorization} 
				options={{
					title: 'Авторизация'
				}}
			/>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    wrapper : {
        paddingHorizontal: 12,
        paddingVertical: 100
    },
    header: {
        borderBottomWidth: 0
    },
	headerTitle: {
		color: '#25263A',
		fontWeight: 'bold',
		fontSize: 20,
		paddingHorizontal: 12,
		width: 300
	}
})

const mapStateToProps = (state : any) => {
    const { parts, screen, user } = state
    return { parts, screen, user }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator)
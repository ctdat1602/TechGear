import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appConfig, width } from '~/configs';
import SplashScreen from 'react-native-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Tabs from '~/components/Tabs';
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import ProductNavigator from './ProductNavigator';
import NewPasgesNavigator from './NewPasgesNavigator';
import { useSelector } from 'react-redux';
import ShoppingCartScreen from '~/views/shopping';

const Tab = createBottomTabNavigator<Routers>();
const tabs: number = 5;

const TabNavigator = () => {
	const tabState = useSelector((state: any) => state.bottomTab.isShow);
	const insets = useSafeAreaInsets();

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="HomeTab"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => <Tabs color={color} route={route.name} tabs={tabs} />,
				tabBarActiveTintColor: appConfig.colors.main,
				tabBarInactiveTintColor: 'gray',
				tabBarShowLabel: false,
				headerShown: false,
				tabBarButton: (icon: any) => <View style={{ width: width / tabs }}>{icon?.children}</View>,
				tabBarStyle: {
					height: tabState === true ? 60 + insets.bottom : 0,
					opacity: tabState === true ? 1 : 0,
					backgroundColor: '#fff',
				},
			})}>
			<Tab.Screen name="HomeTab" component={HomeNavigator} />
			<Tab.Screen name="NewPasges" component={NewPasgesNavigator} />
			<Tab.Screen name="SHOPPING" component={ShoppingCartScreen} />
			<Tab.Screen name="Products" component={ProductNavigator} />
			<Tab.Screen name="User" component={UserNavigator} />
		</Tab.Navigator>
	);
};

export default TabNavigator;

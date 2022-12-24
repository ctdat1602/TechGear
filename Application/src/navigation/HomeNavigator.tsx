import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/views/home';
import DetailScreen from '~/views/home/detail';
import CategoriesHome from '~/views/home/categories';
import InfromationCart from '~/views/shopping/infromationCart';


const Stack = createStackNavigator<Routers>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CategoriesHome" component={CategoriesHome} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
            <Stack.Screen name="InfromationCart" component={InfromationCart} />
        </Stack.Navigator>
    )
}

export default HomeNavigator

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProducstScreen from '~/views/product';
import DetailScreen from '~/views/home/detail';
import CategoriesHome from '~/views/home/categories';
import InfromationCart from '~/views/shopping/infromationCart';

const Stack = createStackNavigator<Routers>();

const ProductNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProducstScreen" component={ProducstScreen} />
            <Stack.Screen name="CategoriesHome" component={CategoriesHome} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
    )
}
export default ProductNavigator

const styles = StyleSheet.create({})
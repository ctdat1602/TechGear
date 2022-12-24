import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NewPasgeScreen from '~/views/NewPasge';
import DetailNewPasge from '~/views/NewPasge/detail';

const Stack = createStackNavigator<Routers>();

const NewPasgesNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NewPasgeScreen" component={NewPasgeScreen} />
            <Stack.Screen name="DetailNewPasge" component={DetailNewPasge} />
        </Stack.Navigator>
    )
}

export default NewPasgesNavigator

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '~/views/user';

const Stack = createStackNavigator<Routers>();

const UserNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserScreen" component={UserScreen} />
            {/* <Stack.Screen name="NewPasgeScreen" component={NewPasgeScreen} /> */}
        </Stack.Navigator>
    )
}

export default UserNavigator

const styles = StyleSheet.create({})
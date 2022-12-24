import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '~/views/auth/LoginScreen';
import RegisterScreen from '~/views/auth/RegisterScreen';
import ForgotScreen from '~/views/auth/ForgotScreen';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator<Routers>();

const AuthNavigator = () => {

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Forgot" component={ForgotScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})
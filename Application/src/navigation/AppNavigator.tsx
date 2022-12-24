import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from '~/views/welcome';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorage } from '~/utils/LocalStorage';
import { setInformations, setLogin, setToken } from '~/store/reducers/user';
import { setWelcome } from '~/store/reducers/globalState';
import { isNull } from 'green-native-ts';

const RootStack = createStackNavigator<Routers>();

const AppNavigator = () => {
    const [loading, setLoading] = useState(true);
    const isWelcome = useSelector((state: any) => state.globalState.isWelcome);
    const dispatch = useDispatch();
    const userData: any = useSelector((state: IUserData) => state.user);
    console.log(userData);

    useLayoutEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await getLocalData();
    };

    const getLocalData = async () => {
        const userInformation = await LocalStorage.getUserInformation();
        if (userInformation !== null) {
            dispatch(setLogin(true));
        } else {
            dispatch(setLogin(false));
        }
        getDataWelcome();
    };

    const getDataWelcome = async () => {
        const res: any = await LocalStorage.getWelcome();
        !!res ? dispatch(setWelcome(false)) : dispatch(setWelcome(true));
        setLoading(false);
    };

    return (
        <NavigationContainer>
            {!loading && (
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    {isWelcome && <RootStack.Screen name="Welcome" component={WelcomeScreen} />}
                    {!isWelcome &&
                        <>
                            {!userData.logged ? (
                                <RootStack.Screen name="Auth" component={AuthNavigator} />
                            ) : (
                                <RootStack.Screen name="Tabs" component={TabNavigator} />
                            )}
                        </>
                    }
                </RootStack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})
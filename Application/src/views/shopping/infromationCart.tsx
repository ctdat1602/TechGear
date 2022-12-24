import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React from 'react'
import imges from '~/lib/img'
import PrimaryButton from '~/components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import icons from '~/lib/icon'

const InfromationCart = () => {
    const navigation = useNavigation<ViewProps['navigation']>();

    return (
        <>
            <StatusBar backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
            <View style={styles.container}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={imges.payment ? imges.payment : imges.logo} />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <PrimaryButton title='Trở về trang chủ'
                        onPress={() => navigation.navigate("HomeScreen")} />
                </View>
            </View>
        </>
    )
}

export default InfromationCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
})
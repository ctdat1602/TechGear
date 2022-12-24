import { Image, ScrollView, StatusBar, StyleSheet, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appConfig, height, width } from '~/configs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PrimaryTextInput from '~/components/PrimaryTextInput'
import PrimaryButton from '~/components/PrimaryButton'
import imges from '~/lib/img'
import { useNavigation } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import ErrorText from '~/components/More/error-text'
import { toast } from '~/utils/function'
import { accountApi } from '~/api/account'
import axios from 'axios'

const ForgotScreen = () => {
    const [status, setStatus] = useState<number>(1);
    const [errorText, setErrorText] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isTrue, setIsTrue] = useState<boolean>(false);

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [Enterthepassword, setEnterthepassword] = useState<String>('');

    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();

    return (
        <View style={styles.contanier}>
            <StatusBar barStyle={"dark-content"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 + insets.top, paddingHorizontal: 26, marginBottom: insets.bottom }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={imges.back} />
                    </TouchableOpacity>
                    <Text style={styles.TextTitle}>Quên mật Khẩu</Text>
                    <View style={{ flex: 1, marginTop: 32 }}>
                        <View style={{ marginBottom: 32, }}>
                            <PrimaryTextInput
                                title="Email"
                                ischeck={isTrue}
                                isError={error == 'email' ? true : false}
                                value={email}
                                onChangeText={(e: string) => setEmail(e)}
                                style={{ width: '100%', borderBottomWidth: 0 }}
                            />
                        </View>
                        <View style={{ marginBottom: 32, }}>
                            <PrimaryTextInput
                                title="Mật khẩu"
                                ischeck={isTrue}
                                isError={error == 'password' ? true : false}
                                isPassword={isTrue ? false : true}
                                value={password}
                                onChangeText={(e: string) => setPassword(e)}
                                style={{ width: '100%', borderBottomWidth: 0 }}
                            />
                        </View>
                        <View style={{ marginBottom: 32, }}>
                            <PrimaryTextInput
                                title="Mật khẩu"
                                ischeck={isTrue}
                                isError={error == 'password' ? true : false}
                                isPassword={isTrue ? false : true}
                                value={password}
                                onChangeText={(e: string) => setPassword(e)}
                                style={{ width: '100%', borderBottomWidth: 0 }}
                            />
                        </View>
                        <View style={{ marginBottom: 32, }}>
                            <PrimaryTextInput
                                title="Mật khẩu"
                                ischeck={isTrue}
                                isError={error == 'password' ? true : false}
                                isPassword={isTrue ? false : true}
                                value={password}
                                onChangeText={(e: string) => setPassword(e)}
                                style={{ width: '100%', borderBottomWidth: 0 }}
                            />
                        </View>

                        <PrimaryButton
                            title='Cập nhập'
                            loading={loading}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ForgotScreen

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff'
    },
    TextTitle: {
        fontSize: 28,
        color: '#000',
        fontFamily: appConfig.fonts.Bold,
        fontWeight: '700',
        lineHeight: 35,
        marginTop: 5
    }

})
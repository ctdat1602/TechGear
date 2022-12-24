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

const sever = [
    {
        key: 1,
        title: 'Đăng nhập'
    },
    {
        key: 2,
        title: 'Đăng Ký'
    }
]

const RegisterScreen = () => {
    const [status, setStatus] = useState<number>(1);
    const [errorText, setErrorText] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isTrue, setIsTrue] = useState<boolean>(false);

    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [Enterthepassword, setEnterthepassword] = useState<any>('');

    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();


    const _onSubmit = (key: number) => {
        setStatus(key);
        key !== 2 && navigation.navigate("Login");
    }

    const _Register = async () => {
        console.log(password.length < 6);
        setError('');
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email === "") {
            setError('email');
            setErrorText('Vui lòng nhập email hoặc tên đăng nhập');
        } else if (reg.test(email) === false) {
            setErrorText("Không đúng định dạnh email");
            return false;
        } else if (password === "") {
            setError('password');
            setErrorText('Vui lòng nhập mật khẩu');
        } else if (password !== Enterthepassword) {
            setError('passwordSignIn')
            setError('Enterthepassword');
            setErrorText('Mật khẩu không trùng khớp với nhau');
        } else {
            setError("");
            setEmail("")
            setPassword("");
            setEnterthepassword("");
            _postData({
                email: email,
                password: password,
                confirmpassword: Enterthepassword,
            })
        }
    };

    const _postData = async (param: any) => {
        setLoading(true)
        try {
            const res: any = await accountApi.register(param);
            if (res.data.status === true) {
                toast("Đăng ký thành công");
                navigation.navigate('Login')
            } else {
                toast("Đăng ký thất bại");
            }
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.contanier}>
            <StatusBar barStyle={"dark-content"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 30 + insets.top, paddingHorizontal: 26 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={imges.back} />
                    </TouchableOpacity>
                    <Text style={styles.TextTitle}>Xin chào</Text>
                    <Text style={styles.TextTitle}>Đăng Ký tại đây</Text>

                    <View style={{ marginBottom: 30, }}>
                        <ScrollView
                            horizontal
                        >
                            {sever.map((item, index) =>
                                <>
                                    <TouchableOpacity style={{ marginTop: 10 }}
                                        onPress={() => _onSubmit(item.key)}
                                        key={index?.toString()}
                                    >
                                        <Text
                                            style={{
                                                marginRight: 5,
                                                color: item.title === "Đăng Ký" ? "#FCCB06" : "#D6D6D6",
                                                fontWeight: '700',
                                                fontFamily: appConfig.fonts.SemiBold,
                                                fontSize: 16
                                            }}
                                        >{item.key === 2 ? "|" : ""} {item.title}</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, }}>
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
                                title="Nhập lại Mật khẩu"
                                ischeck={isTrue}
                                isError={error == 'Enterthepassword' ? true : false}
                                isPassword={isTrue ? false : true}
                                value={Enterthepassword}
                                onChangeText={(e: string) => setEnterthepassword(e)}
                                style={{ width: '100%', borderBottomWidth: 0 }}
                            />
                        </View>

                        <ErrorText content={errorText} />

                        <PrimaryButton
                            title='Đăng Ký'
                            loading={loading}
                            onPress={() => _Register()}
                        />

                        <View style={{ marginTop: 30, marginBottom: insets.bottom, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{
                                    color: "#8A8A8A",
                                    fontWeight: '700',
                                    fontFamily: appConfig.fonts.SemiBold,
                                    fontSize: 15
                                }}>Bạn đã có tài khoản ? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: appConfig.colors.main,
                                        fontWeight: '700',
                                        fontFamily: appConfig.fonts.SemiBold,
                                        fontSize: 15
                                    }}>Đăng nhập</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default RegisterScreen

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
        lineHeight: 35
    }

})
import { ScrollView, StatusBar, StyleSheet, Text, View, } from 'react-native'
import React, { useState } from 'react'
import { appConfig } from '~/configs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PrimaryTextInput from '~/components/PrimaryTextInput'
import PrimaryButton from '~/components/PrimaryButton'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import ErrorText from '~/components/More/error-text'
import { toast } from '~/utils/function'
import { accountApi } from '~/api/account'
import { LocalStorage } from '~/utils/LocalStorage'
import { useDispatch } from 'react-redux'
import { setInformations, setLogin } from '~/store/reducers/user'

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

const LoginScreen = () => {
    const [status, setStatus] = useState<number>(1);
    const [error, setError] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isTrue, setIsTrue] = useState<boolean>(false);

    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);

    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();
    const focus = useIsFocused();
    const dispatch = useDispatch();

    const _onSubmit = (key: number) => {
        setStatus(key);
        key !== 1 && navigation.navigate("Register");
    }

    const _login = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setError("");
        setEmail("")
        setPassword("");
        if (email === "") {
            setError('email');
            setErrorText('Vui lòng nhập email hoặc tên đăng nhập');
        } else if (reg.test(email) === false) {
            setError('email');
            setErrorText("Không đúng định dạnh email");
            return false;
        } else if (password === "") {
            setError('password');
            setErrorText('Vui lòng nhập mật khẩu');
        } else {
            setError("");
            setEmail("")
            setPassword("");
            _postData({
                email: email,
                password: password,
                status: 0
            });
        }
    };

    const _postData = async (param: any) => {
        setLoading(true)
        try {
            const res: any = await accountApi.login(param);
            if (res.data.status === 0) {
                toast("Đăng nhập thành công");
                handleInformation(res);
            } else {
                toast("Đăng nhập thất bại");
            }
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleInformation = async (data: any) => {
        await LocalStorage.setUserInformation(data.data);
        dispatch(setInformations(data.data));
        dispatch(setLogin(true));
    };

    return (
        <View style={styles.contanier}>
            <StatusBar barStyle={"dark-content"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 30 + insets.top, paddingHorizontal: 26, }}>
                    <Text style={styles.TextTitle}>Xin chào</Text>
                    <Text style={styles.TextTitle}>Đăng nhập tại đây</Text>

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
                                                color: item.title === "Đăng nhập" ? "#FCCB06" : "#D6D6D6",
                                                fontWeight: '700',
                                                fontFamily: appConfig.fonts.SemiBold,
                                                fontSize: 16
                                            }}
                                        >{item.title} {item.key === 1 ? "|" : ""}</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, }}>
                        <PrimaryTextInput
                            title="Email"
                            ischeck={isTrue}
                            isError={error == 'email' ? true : false}
                            value={email}
                            onChangeText={(e: string) => setEmail(e)}
                            style={{ width: '100%', borderBottomWidth: 0 }}
                        />
                        <View style={{ marginTop: 32, }}>
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

                        <View style={{ alignItems: 'flex-end', marginVertical: 16 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                                <Text style={{
                                    marginRight: 5,
                                    color: "#8A8A8A",
                                    fontWeight: '700',
                                    fontFamily: appConfig.fonts.SemiBold,
                                    fontSize: 15
                                }}>Quên mật khẩu ?</Text>
                            </TouchableOpacity>
                        </View>

                        <ErrorText content={errorText} />

                        <PrimaryButton
                            title='Đăng nhập'
                            loading={loading}
                            onPress={() => _login()}
                        />

                        <View style={{ marginTop: 30, marginBottom: insets.bottom, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{
                                    color: "#8A8A8A",
                                    fontWeight: '700',
                                    fontFamily: appConfig.fonts.SemiBold,
                                    fontSize: 15
                                }}>Bạn chưa có tài khoản ? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: appConfig.colors.main,
                                        fontWeight: '700',
                                        fontFamily: appConfig.fonts.SemiBold,
                                        fontSize: 15
                                    }}>Đăng ký</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default LoginScreen

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
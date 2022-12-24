import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import CustomHeader from '~/components/CustomHeader';
import { appConfig, height, width } from '~/configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { parseToMoney, toast } from '~/utils';
import PrimaryButton from '~/components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { cartApi } from '~/api/cart';
import imges from '~/lib/img';
import { ViewProps } from '~/navigation/types/viewTypes';
import { useSelector } from 'react-redux';

const ShoppingCartScreen = () => {
  const routes = useRoute<any>();
  const item: any = routes?.params?.Detail || "";
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ViewProps['navigation']>();
  const userData: any = useSelector((state: IUserData) => state.user.informations);
  const [quantity, setQuantity] = useState(1);
  const [delObject, setDelObject] = useState<any>();

  const [loading, setLoading] = useState<any>(true);
  const [data, setData] = useState<any>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getIteamStorage();
  }, [isFocused]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const getIteamStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('DataDetail');
      if (jsonValue === null) {
        setData([]);
      } else {
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  // const onAdd = async (item: any) => {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i]._id === item._id) {
  //       data[i].quantity = data[i].quantity + 1;
  //     }
  //   }
  //   setData(data);
  //   const jsonValue = JSON.stringify(data);
  //   await AsyncStorage.setItem('DataDetail', jsonValue);
  // };

  // const onExcept = async (item: any) => {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i]._id == item._id) {
  //       data[i].quantity = data[i].quantity - 1;
  //     }
  //     setData(data);
  //     const jsonValue = JSON.stringify(data);
  //     await AsyncStorage.setItem('DataDetail', jsonValue);
  //   }
  // };



  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item]);

  const deleteItem = async (ID: any) => {
    let dataArrr = data;
    let index = dataArrr.findIndex((item: any) => item._id === ID);
    dataArrr.splice(index, 1);
    const jsonValue = JSON.stringify(dataArrr);
    await AsyncStorage.setItem('DataDetail', jsonValue);
    setDelObject(new Date());
  };

  const handleOder = () => {
    _getOrder({
      userId: userData.id,
      productId: item._id,
      quantity: quantity,
      status: 1,
    })
  }

  const _getOrder = async (data: any) => {
    setLoading(true)
    try {
      const res: any = await cartApi.order(data);
      if (res.status === 200) {
        deleteItem(item._id);
        navigation.navigate('InfromationCart')
      }
    } catch (error: any) {
      console.log(error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader style='none-user' title="Giỏ Hàng" showTitle />
      <View style={[styles.main]}>
        {data.map((item: any, index: any) =>
          <>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              key={index?.toString()}
            >
              <View style={[styles.item]}>
                <View style={{ justifyContent: 'center' }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 86, height: 86 }}
                  />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 16 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontFamily: appConfig.fonts.Bold,
                      fontWeight: '800',
                    }}>
                    {item.name}
                  </Text>

                  <View style={{ marginVertical: 3 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        marginRight: 5,
                        fontFamily: appConfig.fonts.SemiBold,
                      }}>
                      Số lượng: {item.quantity}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                      textDecorationLine: "line-through", fontSize: 14,
                      color: "#9d9d9d",
                      marginRight: 5,
                      fontFamily: appConfig.fonts.SemiBold,
                    }}>{parseToMoney(item.price || "")}đ</Text>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        color: appConfig.colors.red,
                        marginRight: 5,
                        fontFamily: appConfig.fonts.Bold,
                      }}>
                      {parseToMoney(item.discountPrice || "")}đ
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        borderRadius: 100,
                        alignItems: 'center',
                        paddingVertical: 3,
                        flexDirection: "row",
                        flex: 1
                      }}>
                      <TouchableOpacity
                        // onPress={() => {
                        //   if (quantity > 1) {
                        //     setQuantity(quantity - 1);
                        //     onExcept(item);
                        //   }
                        // }}
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: appConfig.colors.main,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 100,
                        }}>
                        <Text style={{ fontSize: 12, color: '#000' }}>-</Text>
                      </TouchableOpacity>
                      <View style={{ justifyContent: 'center', marginHorizontal: 16 }}>
                        <Text style={{ fontSize: 13 }}>{quantity}</Text>
                      </View>
                      <TouchableOpacity
                        // onPress={() => {
                        //   if (quantity < 10) {
                        //     setQuantity(quantity + 1);
                        //     onAdd(item);
                        //   }
                        // }}
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: appConfig.colors.main,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 100,
                        }}>
                        <Text style={{ fontSize: 12, color: '#000' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleOder()}
                      style={{
                        backgroundColor: "#FCCB06",
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        alignItems: 'center', justifyContent: 'center'
                      }}>
                      <Text style={{ fontSize: 14, color: '#000', fontFamily: appConfig.fonts.Regular }}> Mua hàng</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View >

              <TouchableOpacity
                onPress={() => deleteItem(item._id)}
                style={{
                  width: 56,
                  height: 130,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 34, color: '#fff' }}>X</Text>
              </TouchableOpacity>
            </ScrollView>
          </>

          // <>
          //     <View style={{ flex: 1, marginHorizontal: 16, alignItems: 'center' }}>
          //       <Image
          //         source={imges.payNull}
          //       />
          //       <Text style={{
          //         fontSize: 18, fontWeight: "700", color: "#333366", lineHeight: 50
          //       }}>Hmmm ... !</Text>
          //       <Text style={{
          //         textAlign: 'center',
          //         fontSize: 14,
          //         color: "#4b4b4b",
          //         fontWeight: "600"
          //       }}>Có vẻ như giỏ hàng của bạn đang cảm thấy rất cô đơn ,
          //         trống trải và đang cần bạn giúp đỡ</Text>
          //       <View style={{ flexDirection: 'row', marginTop: 5 }}>
          //         <Text style={{
          //           textAlign: 'center',
          //           fontSize: 14,
          //           color: "#4b4b4b",
          //           fontWeight: "600"
          //         }}>Hãy giúp giỏ hàng , đi đến</Text>
          //         <TouchableOpacity
          //           onPress={() => navigation.navigate("Products")}
          //           style={{ justifyContent: 'center' }}>
          //           <Text style={{ color: 'red', fontSize: 14, fontWeight: "600" }}> Trang sản phẩm </Text>
          //         </TouchableOpacity>
          //         <Text>và</Text>
          //       </View>
          //       <Text style={{
          //         textAlign: 'center',
          //         fontSize: 14,
          //         color: "#4b4b4b",
          //         fontWeight: "600"
          //       }}>thêm sản phẩm thôi</Text>
          //     </View>
          //   </>
        )
        }
      </View >
      {loading && <Spinner visible={true} textContent={'Đang tải..'} textStyle={styles.spinnerTextStyle} />}
    </View >
  )
}

export default ShoppingCartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  main: {
    width: width,
    backgroundColor: '#fff',
  },
  item: {
    height: 130,
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: width,
    paddingVertical: 20,
  },
  spinnerTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: appConfig.fonts.Bold,
  },
})
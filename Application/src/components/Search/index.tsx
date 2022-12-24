import { GreenStyles, useKeyboard } from 'green-native-ts';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { appConfig, height, width } from '~/configs';
import icons from '~/lib/icon';
import imges from '~/lib/img';


type ISearch = {
	onSearch?: Function;
	placeholder?: string;
	hideSort?: boolean;
	style?: 'none' | 'filter' | 'button' | 'filter-button' | "buttonSearch";
	onPressPlus?: Function;
	onPressFilter?: Function;
	title?: string;
	slieshow?: boolean;
};


const Search = (props: ISearch) => {
	const { onSearch, placeholder, slieshow } = props;
	const [search, setSearch] = useState('');

	const _search = () => {
		if (!!onSearch) {
			onSearch(search);
		}
	};

	return (
		<>
			{!!slieshow &&
				< View style={{
					height: 230,
					borderRadius: 5
				}
				}>
					<SwiperFlatList
						autoplay
						autoplayLoop
						showPagination={false}
						data={listImg}
						renderItem={({ item }) => (
							<View style={{ width: width - 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
								<Image source={item.image} style={{ height: 230, borderRadius: 5, width: width / 1.1 }} />
							</View>
						)}
					/>
				</View >
			}
			<View style={[styles.container]}>
				<TouchableOpacity style={styles.search}>
					<Image source={icons.search} style={styles.icSearch} />
				</TouchableOpacity>
				<View style={[styles.main]}>
					<TextInput
						placeholder={placeholder}
						placeholderTextColor="#8E8E93"
						value={search}
						onChangeText={(e: string) => setSearch(e)}
						style={[styles.input,]}
						onEndEditing={() => _search()}
					/>
				</View>
			</View>
		</>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		marginVertical: 16,
		height: 40,
		paddingLeft: 10,
	},
	search: {
		backgroundColor: appConfig.colors.main,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		right: 8
	},
	main: {
		flex: 1,
		backgroundColor: '#EFEFEF',
		borderRadius: 6,
		paddingHorizontal: 12,
	},
	icSearch: {
		width: 20,
		height: 20,
	},
	input: {
		fontSize: 13,
		color: '#000',
		fontFamily: appConfig.fonts.Regular,
		padding: 0,
		margin: 0,
		flex: 1,
	},
	boxShadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 9,
	},
});

const listImg = [
	{
		key: 1,
		image: imges.slide1,
	},
	{
		key: 2,
		image: imges.slide2,
	},
	{
		key: 3,
		image: imges.slide3,
	},
	{
		key: 4,
		image: imges.slide4,
	},
]

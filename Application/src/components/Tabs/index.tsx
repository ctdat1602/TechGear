import React from 'react';
import { View } from 'react-native';
import TabItem from '~/components/Tabs/item';

const noneView = () => {
	return <View style={{ width: 0, height: 0 }}></View>;
};

const Tabs = (props: any): any => {
	const { color, route, tabs } = props;

	if (route === 'HomeTab') {
		return <TabItem tab={tabs} color={color} text="Trang chủ" name={route} />;
	} else if (route === 'User') {
		return <TabItem tab={tabs} color={color} text="Khóa học" name={route} />;
	} else if (route === 'SHOPPING') {
		return <TabItem tab={tabs} color={color} name={route} text />;
	} else if (route === 'Products') {
		return <TabItem tab={tabs} color={color} text="Lịch học" name={route} />;
	} else if (route === 'NewPasges') {
		return <TabItem tab={tabs} color={color} text="Tài khoản" name={route} />;
	} else {
		return noneView;
	}
};

export default Tabs;

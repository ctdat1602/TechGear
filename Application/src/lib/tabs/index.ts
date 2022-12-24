const HOME = require('~/assets/icons/none/home.png');
const USER = require('~/assets/icons/none/user.png');
const SHOPPING = require('~/assets/icons/none/shopping.png');
const NOTI = require('~/assets/icons/none/noti.png');
const MESS = require('~/assets/icons/none/mess.png');

const HOME_ACTIVE = require('~/assets/icons/active/home.png');
const USER_ACTIVE = require('~/assets/icons/active/user.png');
const SHOPPING_ACTIVE = require('~/assets/icons/active/shopping.png');
const NOTI_ACTIVE = require('~/assets/icons/active/noti.png');
const MESS_ACTIVE = require('~/assets/icons/active/mess.png');

const tabIcons = {
	normal: {
		HOME: HOME,
		USER: USER,
		SHOPPING: SHOPPING,
		NOTI: NOTI,
		MESS: MESS,
	},
	activated: {
		HOME: HOME_ACTIVE,
		USER: USER_ACTIVE,
		SHOPPING: SHOPPING_ACTIVE,
		NOTI: NOTI_ACTIVE,
		MESS: MESS_ACTIVE,
	},
};

export default tabIcons;

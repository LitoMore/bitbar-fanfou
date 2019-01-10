#!/usr/bin/env /usr/local/bin/node
// <bitbar.title>Fanfou</bitbar.title>
// <bitbar.version>v0.0.0</bitbar.version>
// <bitbar.author>LitoMore</bitbar.author>
// <bitbar.author.github>LitoMore</bitbar.author.github>
// <bitbar.desc>BitBar Fanfou</bitbar.desc>
// <bitbar.image>bitbar-fanfou-icon.png</bitbar.image>
// <bitbar.dependencies>node</bitbar.dependencies>
// <bitbar.abouturl>https://github.com/LitoMore/bitbar-fanfou</bitbar.abouturl>
'use strict';
const fs = require('fs');
const path = require('path');
const Conf = require('conf');
const importLazy = require('import-lazy')(require);

const common = importLazy('./utils/common');
const normalIcon = path.join(__dirname, 'media/icon.png');
const activeIcon = path.join(__dirname, 'media/icon-active.png');
const errorIcon = path.join(__dirname, 'media/icon-error.png');

// Check dependencies
const installed = fs.existsSync(path.join(__dirname, 'node_modules'));
if (!installed) {
	console.log(` | templateImage=${common.iconEncode(errorIcon)}`);
	common.renderInstallMenu();
	process.exit(1);
}

// Load fanfou-sdk
const Fanfou = importLazy('fanfou-sdk');

if (!common.hasConfig()) {
	console.log(` | templateImage=${common.iconEncode(errorIcon)}`);
	console.log('---');
	console.log('⚠️ No config file found');
	common.renderConfigMenu();
	process.exit(1);
}

const {consumerKey, consumerSecret, username, password, https, notification} = common.getSettings();
const mentionsLink = ` | href=${https ? 'https' : 'http'}://fanfou.com/mentions`;
const directMessagesLink = `| href=${https ? 'https' : 'http'}://fanfou.com/privatemsg`;
const friendRequestsLink = `| href=${https ? 'https' : 'http'}://fanfou.com/friend.request`;

const config = new Conf();
const ff = new Fanfou({
	consumerKey,
	consumerSecret,
	username,
	password,
	protocol: https ? 'https:' : 'http:',
	hooks: {
		baseString: str => https ? str.replace('https', 'http') : str
	}
});

(async () => {
	try {
		await ff.xauth();
		const result = await ff.get('/account/notification');
		const {m = 0, dm = 0, fr = 0} = config.get('notification') || {};
		const {mentions, direct_messages: directMessages, friend_requests: friendRequests} = result;
		const newMentions = mentions > m;
		const newDirectmessages = directMessages > dm;
		const newFriendRequests = friendRequests > fr;
		config.set('notification', {m: mentions, dm: directMessages, fr: friendRequests});
		if (notification && (newMentions || newDirectmessages || newFriendRequests)) {
			common.showNotifier(
				[
					{type: 'm', value: newMentions},
					{type: 'dm', value: newDirectmessages},
					{type: 'fr', value: newFriendRequests}
				]
					.filter(item => item.value)
					.map(item => {
						switch (item.type) {
							case 'm': {
								return `${mentions} mention${mentions - m > 1 ? 's' : ''}`;
							}
							case 'dm': {
								return `${directMessages} direct message${directMessages - dm > 1 ? 's' : ''}`;
							}
							case 'fr': {
								return `${friendRequests} friend request${friendRequests - fr > 1 ? 's' : ''}`;
							}
							default:
								return '';
						}
					})
					.join('\n')
			);
		}
		const active = mentions + directMessages + friendRequests > 0;
		console.log(` | templateImage=${common.iconEncode(active ? activeIcon : normalIcon)}`);
		console.log('---');
		console.log(`Mentions: ${mentions}${mentions > 0 ? mentionsLink : ''}`);
		console.log(`Direct messages: ${directMessages}${directMessages > 0 ? directMessagesLink : ''}`);
		console.log(`Friend requests: ${friendRequests}${friendRequests > 0 ? friendRequestsLink : ''}`);
	} catch (error) {
		console.log(` | templateImage=${common.iconEncode(errorIcon)}`);
		console.log('---');
		console.log(error.message);
	}
	common.renderConfigMenu();
})();

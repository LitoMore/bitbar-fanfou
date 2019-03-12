#!/usr/bin/env /usr/local/bin/node
'use strict';

const Fanfou = require('fanfou-sdk');
const common = require('../utils/common');

const {consumerKey, consumerSecret, username, password, https} = common.getSettings();

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
	await ff.xauth();
	await ff.get('/statuses/mentions', {count: 1});
})();

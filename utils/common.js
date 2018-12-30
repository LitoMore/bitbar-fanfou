'use strict';

const fs = require('fs');
const path = require('path');
const execa = require('execa');

const hasConfig = () => {
	return fs.existsSync(path.join(__dirname, '../config/settings.json'));
};

const iconEncode = file => {
	const bitmap = fs.readFileSync(file);
	return Buffer.from(bitmap).toString('base64');
};

const shell = (shell, opt) => {
	const allParams = Object.keys(opt)
		.map(key => `${key}="${opt[key]}"`)
		.join(' ');
	return `bash="${path.join(__dirname, `../scripts/${shell}`)}" ${allParams}`;
};

const renderInstallMenu = () => {
	console.log('---');
	console.log(`Install dependencies | ${shell('install.sh', {terminal: true, refresh: true, param1: path.join(__dirname, '..')})}`);
};

const renderConfigMenu = () => {
	console.log('---');
	console.log(`Reveal config in Finder | ${shell('open.sh', {terminal: false, param1: path.join(__dirname, '../config')})}"`);
};

const showNotifier = message => {
	return execa(path.join(__dirname, '../scripts/notifier.applescript'), [message]);
};

const getSettings = () => {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../config/settings.json')));
};

module.exports = {
	hasConfig,
	iconEncode,
	renderInstallMenu,
	renderConfigMenu,
	showNotifier,
	getSettings
};

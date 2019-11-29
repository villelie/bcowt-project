'use strict';

const connection = require('./db');

exports.getAll = async () => {
	try {
		const [results, fields] = await connection.query('SELECT * FROM users');
		console.log(results);
		console.log(fields);
		return results;
	} catch (e) {
		console.log(e);
		throw 'db error :(';
	}
};

exports.search = async (name) => {
	try {
		const [results] = await connection.query('SELECT * FROM users WHERE user_name LIKE ?', [name]);
		return results;
	} catch(e) {
		console.log(e);
		throw 'db error :(';
	}
};

exports.insert = async (name, email, pass) => {
	try {
		const [result] = await connection.query('INSERT INTO users (user_name, user_email, user_pass) VALUES (?, ?, ?)', [name, email, pass]);
		return result;
	} catch (e) {
		console.log(e);
		throw('db error :(');
	}
};
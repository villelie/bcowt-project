'use strict';

const connection = require('./db');

exports.getAll = async () => {
	try {
		const [results, fields] = await connection.query('SELECT * FROM pics');
		console.log(results);
		console.log(fields);
		return results;
	} catch (e) {
		console.log(e);
		throw 'db error :(';
	}
};

exports.search = async (txt) => {
	try {
		const [results] = await connection.query('SELECT * FROM pics WHERE pic_title LIKE ?', [txt]);
		return results;
	} catch(e) {
		console.log(e);
		throw 'db error :(';
	}
};

exports.insert = async (title, description) => {
	try {
		const [result] = await connection.query('INSERT INTO pics (pic_title, pic_desc) VALUES (?, ?)', [title, description]);
		return result;
	} catch (e) {
		console.log(e);
		throw('db error :(');
	}
};
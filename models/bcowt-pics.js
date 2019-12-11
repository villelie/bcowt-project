'use strict';

const connection = require('../database/db');

exports.getAll = async () => {
	try {
		const [results, fields] = await connection.query('SELECT pics.*, users.user_name as owner FROM pics JOIN users ON users.user_id = pics.owner_id ORDER BY pics.pic_id DESC;');
		return results;
	} catch (e) {
		console.log(e);
		throw 'db error :(';
	}
};

exports.getOwner = async (id) => {
	try {
		const [results, fields] = await connection.query('SELECT pics.*, users.user_name as owner FROM pics JOIN users ON users.user_id = pics.owner_id WHERE owner_id = ?', [id]);
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

exports.insert = async (owner, title, description, file) => {
	if (owner && title && description && file) {
		try {
			const [results] = await connection.query('INSERT INTO pics (owner_id, pic_title, pic_desc, pic_file) VALUES (?, ?, ?, ?)', [owner, title, description, file]);
			return results;
		} catch (e) {
			console.log(e);
			throw('db error :(');
		}
	}
};

exports.del = async (id) => {
	try {
		const [results] = await connection.query('DELETE FROM pics WHERE pic_id = ?', [id]);
		return results;
	} catch (e) {
		console.log(e);
	}
};

exports.like = async (id) => {
	try {
			const [results] = await connection.query('UPDATE pics SET pic_likes = pic_likes +1 WHERE pic_id = ?;', [id]);
			return results;
	} catch (e) {
			console.log(e);
			throw('db error :(');
	}
};
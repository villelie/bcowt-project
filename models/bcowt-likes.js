'use strict'


const connection = require('./db');

exports.getAll = async () => {
  try {
    const [results, fields] = await connection.query('SELECT pic_likes FROM pics');
    console.log(results);
    console.log(fields);
    return results;
  } catch (e) {
    console.log(e);
    throw 'db error :(';
  }
};
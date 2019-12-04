'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const picController = require('./picModel');

router.get('/', picController.getAll);

router.get('/:id', picController.search);

router.post('/', upload.single('upload'), picController.insert);

router.put('/', (req, res) => {
	res.send('With this endpoint you can put(?) pics.');
});

//router.delete('/:id', picController.pic_del);

module.exports = router;
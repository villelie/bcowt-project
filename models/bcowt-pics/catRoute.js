'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), catController.cat_create_post);

router.put('/', (req, res) => {
	res.send('With this endpoint you can put(?) cats.');
});

router.delete('/:id', catController.cat_del);

module.exports = router;

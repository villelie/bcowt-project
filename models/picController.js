'use strict';
const picModel = require('/picModel');

const pic_list_get = async (req, res) => {
	const pics = await picModel.getAllPics();
	await res.json(pics);
};

const pic_create_post = async (req, res) => {
	 try {
    // create thumbnail
    await resize.makeThumbnail(
        req.file.path,
        'thumbnails/' + req.file.pic_file,
        {width: 160, height: 160},
    );
	
	const params = [
		req.body.pic_id,
		req.body.pic_title,
		req.body.pic_desc,
		req.file.pic_file,
	  ];
	const response = await picModel.addPic(params);
	await res.json(response);
};

const pic_get = async (req, res) => {
	const params = [req.params.id];
	const pic = await picModel.getPic(params);
	await res.json(pic[0]);
};

const pic_del = async (req, res) => {
	const params = [req.params.id];
	const pic = await picModel.delPic(params);
	await res.json(pic[0]);
};

module.exports = {
	pic_list_get,
	cat_create_post,
	pic_get,
	pic_del
};
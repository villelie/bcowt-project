'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, size, thumbname) => { 
await sharp(file).resize(size.width, size.height).png().toFile(thumbname);
};

module.exports = {
	makeThumbnail,
};
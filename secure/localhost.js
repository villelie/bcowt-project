'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');

const httpPort = 3033;
const httpsPort = 8088;

const options = {
	key: fs.readFileSync(process.env.KEY),
	cert: fs.readFileSync(process.env.CERT)
};

module.exports = (app) => {
	https.createServer(options, app).listen(httpsPort);

	http.createServer((req, res) => {
		res.writeHead(301, { 'Location': `https://localhost:${httpsPort}` + req.url });
		res.end();
	}).listen(httpPort);
}
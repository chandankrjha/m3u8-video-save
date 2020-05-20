const m3u8Parser = require('m3u8-parser');
const fs = require('fs');
const http = require('https');
const { URL } = require('url');
const url =
	'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_1080_4800000.m3u8';

const axios = require('axios');

async function saveTsFiles(folderName) {
	const response = await axios.get(url);
	var parser = new m3u8Parser.Parser();

	parser.push(response.data);
	parser.end();

	var parsedManifest = parser.manifest;

	!fs.existsSync(folderName) && fs.mkdirSync(folderName);
	parsedManifest.segments.forEach(({ uri }) => {
		const videoUrl = new URL(uri, url);

		const file = fs.createWriteStream(`./${folderName}/${uri.split('/').pop()}`, {
			mode: 0o777,
		});

		http.get(videoUrl, function(response) {
			response.pipe(file);
		});
	});
}

const folderName = 'test';
const startingTime = new Date().getTime();
// for single m3u8 file
saveTsFiles(folderName);

// for constantly updating stream file
const testInterval = setInterval(() => {
	saveTsFiles(folderName);
	const currentTime = new Date().getTime();
	if (currentTime - startingTime > 1000 * 60 * 2) {
		clearInterval(testInterval);
	}
}, 3000);

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const stdio = require('stdio');

const { folderName = 'test', output = 'output.mp4' } = stdio.getopt({
	folderName: { key: 'f', description: 'folderName', default: 'test' },
	output: { key: 'o', description: 'output file name', default: 'output.mp4' },
});

fs.readdir(`./dl/${folderName}`, (err, files) => {
	const ff = ffmpeg(__dirname + `/dl/${folderName.split('/').pop()}/` + files[0]);
	files.forEach(file => {
		ff.input(__dirname + `/dl/${folderName.split('/').pop()}/` + file);
	});

	ff.on('error', function(err) {
		console.log('An error occurred: ' + err.message);
	})
		.on('end', function() {
			console.log('Merging finished !');
		})
		.mergeToFile(__dirname + `/dl/${folderName.split('/').pop()}/` + output);
});

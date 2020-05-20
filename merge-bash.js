const { exec } = require('child_process');

const commandToMerge = 'cat ./dl/test/*.ts | ffmpeg  -i pipe: -c:a copy -c:v copy o1output.mp4';
exec(commandToMerge, (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
});

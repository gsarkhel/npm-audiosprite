// If 'audiosprite' is not recognized then run 'npm install -g audiosprite'

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let files = fs.readdirSync(path.resolve('./src'));
files = files.map(str => `src/${str}`);
const fileStr = files.join(' ');

// const script = 'audiosprite --path ‘./src’ --output myAudioSpriteFinalFile -f howler --export mp3 alligator.mp3 ant.mp3';
const script = `audiosprite --output output/audiosprite -f howler --export mp3 ${fileStr}`;
const child = exec(script);

// Log all the success messages
child.stdout.on('data', (data) => {
    console.log(data);
});
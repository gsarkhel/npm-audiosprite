// If 'audiosprite' is not recognized then run 'npm install -g audiosprite'

const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { exec } = require('child_process');

let files = readdirSync(resolve('./src'));
files = files.map(str => `src/${str}`);
const fileStr = files.join(' ');

// const script = 'audiosprite --path ‘./src’ --output myAudioSpriteFinalFile -f howler --export mp3 alligator.mp3 ant.mp3';
const script = `audiosprite --output output/audiosprite -f howler --export mp3 ${fileStr}`;
const child = exec(script);

// Log all the success messages
child.stdout.on('data', (data) => {
    console.log(data);
});

child.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);

    updateJSON();
});

const updateJSON = () => {
    let jsonStr = readFileSync('./output/audiosprite.json', 'utf8');
    jsonStr = jsonStr.replace('"urls":', '"src":');
    writeFileSync('./output/audiosprite.json', jsonStr, 'utf8')
}
const fs = require('fs');
const path = require('node:path');

const pathToTxt = path.join(__dirname, 'text.txt');

const result = fs.ReadStream(pathToTxt, 'utf-8');

result.on('data', data => console.log(data));
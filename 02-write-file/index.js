const fs = require('fs');
const path = require('node:path');
const { stdin, stdout } = process;

let pathToTxt = path.join(__dirname, '1.txt');

let typeExitMessage = () => console.log(`You can find document here: ${pathToTxt}`);

fs.readFile(pathToTxt, (err) => {
  if (err) {
    fs.createWriteStream(pathToTxt);
  }
});

stdout.write('Enter text down here. Type \'exit\' or press Ctrl+C to quit\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    typeExitMessage();
    process.exit();
  }
  fs.appendFile(pathToTxt, data, (err) => {
    if (err) {
      console.log('error=', err);
    }
  });
});

process.on('SIGINT', () => {
  typeExitMessage();
  process.exit();
});
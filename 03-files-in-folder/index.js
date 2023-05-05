const fs = require('fs');
const path = require('node:path');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    for (let i = 0; i < files.length; i += 1){
      if (files[i].isFile()){
        let fileName = files[i].name.slice(0, files[i].name.lastIndexOf('.'));
        let fileExtension = files[i].name.slice(files[i].name.lastIndexOf('.') + 1);
        let pathToFile = (pathToFolder + '\\' + files[i].name);
        fs.stat(pathToFile, (err, stats) => {
          if (err) {
            throw err;
          } else {
            let fileSize = (stats.size / 1024).toFixed(3);
            console.log(fileName, '-', fileExtension, '-', fileSize, 'kB');
          }
        });
      }
    }
  }
});
const fs = require('fs');
const path = require('node:path');

let pathToSourseFolder = path.join(__dirname, '\\files');
let pathToNewFolder = path.join(__dirname, '\\files-copy');

fs.rm(pathToNewFolder, { recursive:true, force:true }, err => {
  if (err) {
    throw err;
  } else {
    fs.mkdir(path.join(__dirname, '\\files-copy'), { recursive: true }, err => {
      if (err) {
        throw err;
      } else {
        fs.readdir(pathToSourseFolder, {withFileTypes: true}, (err, files) => {
          if (err) {
            throw err;
          } else {
            for (let i = 0; i < files.length; i += 1) {
              let pathToSrcFile = pathToSourseFolder + '\\' + files[i].name;
              let pathToDestFile = pathToNewFolder + '\\' + files[i].name;
              fs.copyFile(pathToSrcFile, pathToDestFile, (err) => {
                if (err) {
                  throw err;
                }
              });
            }
          }
        });
      }
    });
  }
});
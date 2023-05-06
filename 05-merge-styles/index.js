const fs = require('fs');
const path = require('node:path');

let pathToStylesFolder = path.join(__dirname, '\\styles');
let pathToDist = path.join(__dirname, '\\project-dist');
let pathToBundle = pathToDist + '\\bundle.css';

fs.rm(pathToBundle, { recursive:true, force:true }, err => {
  if (err) {
    throw err;
  } else {
    fs.writeFile(pathToBundle, '', err => {
      if (err) {
        throw err;
      } else {
        fs.readdir(pathToStylesFolder, {withFileTypes: true}, (err, files) => {
          if (err) {
            throw err;
          } else {
            for (let i = 0; i < files.length; i += 1) {
              let fileExtension = files[i].name.slice(files[i].name.lastIndexOf('.'));
              let pathToStyle = pathToStylesFolder + '\\' + files[i].name;
              if (fileExtension === '.css'){
                fs.readFile(pathToStyle, 'utf-8', (err, data) => {
                  if (err) {
                    throw err;
                  } else {
                    fs.appendFile(pathToBundle, data + '\n', err => {
                      if (err) {
                        throw err;
                      }
                    });
                  }
                });
              }
            }
          }
        });
      }
    });
  }
});
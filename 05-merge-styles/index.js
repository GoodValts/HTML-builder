const fs = require('fs');
const path = require('node:path');

let pathToStylesFolder = path.join(__dirname, '\\styles');
let pathToDist = path.join(__dirname, '\\project-dist');
let pathToBundle = pathToDist + '\\bundle.css';

//console.log(pathToStylesFolder,'\n',pathToDist);

fs.rm(pathToBundle, { recursive:true, force:true }, err => {
  if (err) {
    throw err;
  } else {
    //console.log('aa');
    fs.writeFile(pathToBundle, '', err => {
      if (err) {
        throw err;
      } else {
        //console.log('bundle.css created');
        fs.readdir(pathToStylesFolder, {withFileTypes: true}, (err, files) => {
          if (err) {
            throw err;
          } else {
            console.log(files);
            for (let i = 0; i < files.length; i += 1) {
              let fileExtension = files[i].name.slice(files[i].name.lastIndexOf('.'));
              let pathToStyle = pathToStylesFolder + '\\' + files[i].name;
              //console.log(fileExtension);
              console.log(pathToStyle);
              if (fileExtension === '.css'){
                //console.log('y');
                fs.readFile(pathToStyle, 'utf-8', (err, data) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log(files[i].name);
                    //console.log(data);
                    //console.log('---');
                    fs.appendFile(pathToBundle, data + '\n', err => {
                      if (err) {
                        //console.log('aa');
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
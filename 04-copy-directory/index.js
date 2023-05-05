console.log('test4');

const fs = require('fs');
const path = require('node:path');

let pathToSourseFolder = path.join(__dirname, '\\files');
let pathToNewFolder = path.join(__dirname, '\\files-copy');

//console.log(pathToNewFolder);
/*

fs.readdir(__dirname, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    //console.log('files=', files);
    for (let i = 0; i < files.length; i += 1) {
      //console.log('---start cycle---');
      //console.log('files[i].name=', files[i].name);
      if (files[i].isDirectory() === true && files[i].name === 'files-copy') {
        //console.log('!!!find files-copy');
        fs.readdir(pathToNewFolder, {withFileTypes: true}, (err, files) => {
          if (err) {
            throw err;
          } else {
            console.log(files);
            for (let i = 0; i < files.length; i += 1) {
              console.log('zz=', files[i].name);
              let pathToFile = pathToNewFolder + '\\' + files[i].name;
              console.log(pathToFile);
              fs.rm(pathToFile, err => {
                if (err) {
                  throw err;
                } else {
                  console.log('delete', files[i].name);
                }
              });
            }
          }
        });
      }
      //console.log('---end cycle---');
    }
  }
});


fs.mkdir(path.join(__dirname, '\\files-copy'), { recursive: true }, err => {
  if (err) {
    throw err;
  } else {
    console.log('new repo');
  }
});


fs.readdir(pathToSourseFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    //console.log('files=', files);
    for (let i = 0; i < files.length; i += 1) {
      let pathToSrcFile = pathToSourseFolder + '\\' + files[i].name;
      let pathToDestFile = pathToNewFolder + '\\' + files[i].name;
      //console.log(pathToSrcFile, '\n', pathToDestFile);
      fs.copyFile(pathToSrcFile, pathToDestFile, (err) => {
        if (err) {
          throw err;
        } else {
          console.log ('copy', files[i].name);
        }
      });
    }
  }
});*/

fs.rm(pathToNewFolder, { recursive:true, force:true }, err => {
  if (err) {
    throw err;
  } else {
    fs.mkdir(path.join(__dirname, '\\files-copy'), { recursive: true }, err => {
      if (err) {
        throw err;
      } else {
        console.log('new repo');
        fs.readdir(pathToSourseFolder, {withFileTypes: true}, (err, files) => {
          if (err) {
            throw err;
          } else {
            console.log('files=', files);
            for (let i = 0; i < files.length; i += 1) {
              let pathToSrcFile = pathToSourseFolder + '\\' + files[i].name;
              let pathToDestFile = pathToNewFolder + '\\' + files[i].name;
              //console.log(pathToSrcFile, '\n', pathToDestFile);
              fs.copyFile(pathToSrcFile, pathToDestFile, (err) => {
                if (err) {
                  throw err;
                } else {
                  console.log ('copy', files[i].name);
                }
              });
            }
          }
        });
      }
    });
  }
});
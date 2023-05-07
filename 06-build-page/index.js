const fs = require('fs');
const path = require('node:path');
let arr = [];

fs.rm(path.join(__dirname, '\\project-dist'), { recursive:true, force:true }, err => {
  if (err) {
    throw err;
  } else {
    fs.mkdir(path.join(__dirname, '\\project-dist'), { recursive: true }, err => {
      if (err) {
        throw err;
      } else {
        fs.mkdir(path.join(__dirname, '\\project-dist\\assets'), { recursive: true }, err => {
          if (err) {
            throw err;
          } else {
            fs.readdir(path.join(__dirname, '\\assets'), {withFileTypes: true}, (err, files) => {
              if (err) {
                throw err;
              } else {
                for (let i=0; i<files.length; i += 1) {
                  let pathToSrcFile = path.join(__dirname, '\\assets') + '\\' + files[i].name;
                  let pathToDestFile = path.join(__dirname, '\\project-dist\\assets') + '\\' + files[i].name;
                  fs.copyFile(pathToSrcFile, pathToDestFile, (err) => {
                    if (err) {
                      if (err.errno === -4048){
                        copyFolders(err, pathToSrcFile);
                      } else {
                        throw err;
                      }
                    }
                  })
                }
                fs.copyFile (path.join(__dirname, '\\template.html'), path.join(__dirname, '\\project-dist\\index.html'), (err) => {
                  if (err){
                    throw err;
                  } else {
                    fs.writeFile(path.join(__dirname, '\\project-dist\\style.css'), '', err => {
                      if (err) {
                        throw err;
                      } else {
                        fs.readdir(path.join(__dirname, '\\styles'), { withFileTypes: true }, (err, files) => {
                          if (err) {
                            throw err;
                          } else {
                            for (let i = 0; i < files.length; i += 1) {
                              let fileExtension = files[i].name.slice(files[i].name.lastIndexOf('.'));
                              let pathToStyle = path.join(__dirname, '\\styles') + '\\' + files[i].name;
                              if (fileExtension === '.css') {
                                fs.readFile(pathToStyle, 'utf-8', (err, data) => {
                                  if (err) {
                                    throw err;
                                  } else {
                                    fs.appendFile(path.join(__dirname, '\\project-dist\\style.css'), data + '\n', err => {
                                      if (err) {
                                        throw err;
                                      }
                                    });
                                  }
                                });
                              }
                            }
                            fs.readFile(path.join(__dirname, '\\project-dist\\index.html'), 'utf-8', (err, data) => {
                              if (err) {
                                throw err;
                              } else {
                                arr = findValues(data, arr);
                                for (let i=0; i<arr.length; i += 1) {
                                  fs.readdir(path.join(__dirname, '\\components'), {withFileTypes: true}, (err, files) => {
                                    if (err) {
                                      throw err;
                                    } else {
                                      for (let x=0; x<arr.length; x += 1) {
                                        if (files[x].name.slice(0, -5) === arr[i]) {
                                          fs.readFile(path.join(__dirname, '\\components\\', files[x].name), 'utf-8', (err, value) => {
                                            if (err) {
                                              throw err;
                                            } else {
                                              data = data.replace(`{{${arr[i]}}}`, value);
                                              fs.writeFile(path.join(__dirname, '\\project-dist\\index.html'), data, err => {
                                                if (err) {
                                                  throw err;
                                                }
                                              });
                                            }
                                          });
                                        }
                                      }
                                    }
                                  })
                                }
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
})

function copyFolders(err, directoryPath) {
  if (err.errno === -4048) {
    fs.readdir(directoryPath, {withFileTypes: true}, (err, files) => {
      if (err) {
        throw err;
      } else {
        let pathToFolder = directoryPath.replace('assets', 'project-dist\\assets');
        fs.mkdir(pathToFolder, { recursive: true }, err => {
          if (err) {
            throw err;
          } else {
            for (let i = 0; i < files.length; i += 1) {
              let pathToSrcFile = directoryPath + '\\' + files[i].name;
              let pathToDestFile = pathToSrcFile.replace('assets', 'project-dist\\assets');
              fs.copyFile(pathToSrcFile, pathToDestFile, (err) => {
                if (err) {
                  if (err.errno === -4048){
                    copyFolders(err, pathToSrcFile);
                  } else {
                    throw err;
                  }
                }
              });
            }
          }
        });
      }
    });
  } else {
    throw err;
  }
}

function findValues (string, array) {
  do {
    let openBrasketPosition = string.indexOf('{{');
    let closeBrasketPosition = string.indexOf('}}');
    let value = string.slice(openBrasketPosition + 2, closeBrasketPosition)
    array.push(value);
    string = string.replace(`{{${value}}}`, `[[${value}]]`);
  } while (string.includes('{{'));
  
  return array;
}
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
            console.log('assets created');
            fs.readdir(path.join(__dirname, '\\assets'), {withFileTypes: true}, (err, files) => {
              if (err) {
                throw err;
              } else {
                //console.log(files);
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
                console.log('copied to pr dist assets');
                fs.copyFile (path.join(__dirname, '\\template.html'), path.join(__dirname, '\\project-dist\\index.html'), (err) => {
                  if (err){
                    throw err;
                  } else {
                    console.log('index.html created');
                    fs.writeFile(path.join(__dirname, '\\project-dist\\style.css'), '', err => {
                      if (err) {
                        throw err;
                      } else {
                        console.log('style.css created');
                        fs.readdir(path.join(__dirname, '\\style'), { withFileTypes: true }, (err, files) => {
                          if (err) {
                            throw err;
                          } else {
                            for (let i = 0; i < files.length; i += 1) {
                              let fileExtension = files[i].name.slice(files[i].name.lastIndexOf('.'));
                              let pathToStyle = path.join(__dirname, '\\style') + '\\' + files[i].name;
                              //console.log(fileExtension);
                              //console.log(pathToStyle);
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
                            console.log('style.css appended');
                            fs.readFile(path.join(__dirname, '\\project-dist\\index.html'), 'utf-8', (err, data) => {
                              if (err) {
                                throw err;
                              } else {
                                //console.log(data);
                                arr = findValues(data, arr);
                                console.log('arr=', arr);
                                for (let i=0; i<arr.length; i += 1) {
                                  fs.readdir(path.join(__dirname, '\\components'), {withFileTypes: true}, (err, files) => {
                                    if (err) {
                                      throw err;
                                    } else {
                                      for (let x=0; x<arr.length; x += 1) {
                                        console.log(arr[i]);
                                        console.log(files[x].name);
                                        if (files[x].name.slice(0, -5) === arr[i]) {
                                          console.log(data.includes(arr[i]));
                                          fs.readFile(path.join(__dirname, '\\components\\', files[x].name), 'utf-8', (err, value) => {
                                            if (err) {
                                              throw err;
                                            } else {
                                              data = data.replace(`{{${arr[i]}}}`, value);
                                              //console.log(data);
                                              console.log('---');
                                              fs.writeFile(path.join(__dirname, '\\project-dist\\index.html'), data, err => {
                                                if (err) {
                                                  throw err;
                                                } else {
                                                  console.log('index.html is writed')
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
    console.log['arr=', arr];
  } while (string.includes('{{'));
  
  return array;
}
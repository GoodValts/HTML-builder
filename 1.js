let str = 'some text\n {{header}} \n some more text\n {{main}} \n once more'
let str2 = 'sdfsadffd';

console.log(str);

let valuesArr = [];

function findValues (string) {
  do {
    let openBrasketPosition = string.indexOf('{{');
    let closeBrasketPosition = string.indexOf('}}');
    console.log(openBrasketPosition);
    console.log(closeBrasketPosition);
    let value = string.slice(openBrasketPosition + 2, closeBrasketPosition)
    console.log(value);
    valuesArr.push(value);
    string = string.replace(`{{${value}}}`, `[[${value}]]`);
    console.log('---');
    console.log('str=', string);
    console.log('---');
  } while (string.includes('{{'));
}

findValues(str);

console.log(valuesArr);

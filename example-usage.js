const fs = require('fs');
const compareSTTServices  = require('./index.js');

const testBaseText = fs.readFileSync('./sample-data/base-text-1.txt').toString();
const testNewText = fs.readFileSync('./sample-data/hypothesis-text-1.txt').toString();


var result = compareSTTServices({
    baseText: testBaseText, 
    baseName: 'original text',
//     // can compare base text against multiple versions
    textToCompare : [
        {
            hypothesisText: testNewText,
            hypothesisName: 'some text from a STT service'
        }
        //,
        // {
        //     hypothesisText: testNewText,
        //     hypothesisName: 'some text from a STT service'
        // }
    ]
});

console.log(JSON.stringify(result,null,2));



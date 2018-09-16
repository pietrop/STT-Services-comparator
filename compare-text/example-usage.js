const fs = require('fs');
const compareText  = require('./index.js');

// const testBaseText = fs.readFileSync('./compare-text/sample-data/base-text-1.txt').toString();
// const testNewText = fs.readFileSync('./compare-text/sample-data/hypothesis-text-1.txt').toString();
// 
const book_MobyDickBookChapterOne = fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/book-moby-dick-chapter-1.txt', 'utf8').toString();
const speechmatics_MobyDickBookChapterOne =  fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/Speechmatics-16-09-18-moby-dick-chapter-1.txt', 'utf8').toString();
const assemblyAI_MobyDickBookChapterOne = fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/AssemblyAI-16-09-18-moby-dick-chapter-1.txt', 'utf8').toString();
const IBM_MobyDickBookChapterOne = fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/IBM-16-09-18-moby-dick-chapter-1.txt', 'utf8').toString();
const pocketsphinx_MobyDickBookChapterOne =  fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/pocketsphinx-moby-dick-chapter-1.txt', 'utf8').toString();
const gentle_MobyDickBookChapterOne =  fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/gentle-16-09-18-moby-dick-chapter-1.txt', 'utf8').toString();



var result = compareText({
    baseText: book_MobyDickBookChapterOne, 
    baseName: 'Moby Dick - Book, Chapter 1',
    calculateWordErrorRateOption: true, 
    showDiffTextResults: false,
    // can compare base text against multiple versions
    textToCompare : [
        {
            hypothesisText: speechmatics_MobyDickBookChapterOne,
            hypothesisName: 'Speechmatics'
        },
        {
            hypothesisText: assemblyAI_MobyDickBookChapterOne,
            hypothesisName: 'AssemblyAI'
        },
        
        {
            hypothesisText: IBM_MobyDickBookChapterOne,
            hypothesisName: 'IBM'
        },
        {
            hypothesisText: gentle_MobyDickBookChapterOne,
            hypothesisName: 'Gentle - Kaldi'
        },
        {
            hypothesisText: pocketsphinx_MobyDickBookChapterOne,
            hypothesisName: 'Pocketsphinx'
        }
    ]
});

fs.writeFileSync('./compare-text/example/comparison-stt.json',JSON.stringify(result,null,2));
// console.log(JSON.stringify(result,null,2));
console.log('done comparing')



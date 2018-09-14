
const diffJsSTT  = require('./diff-js-stt/index.js');
const levenshtein = require('fast-levenshtein');


/**
 * allows to compare one or more stt automated transcription against an accurate, human transcription base one.
 * it returns some scores around
 * 
 * returns an array containing comparison result objects 
 * example output
 [ { stats:
     { baseTextTotalNumberOfWords: 65,
       matched: 56,
       replaced: 13,
       inserted: 0,
       deleted: 0 },
    comparison: {},
    baseTextName: 'original text',
    newTextName: 'some text from a STT service' },
 ...
 ]
 */
function compareSTTServices(params){
    var numberOfComparisons = params.textToCompare.length;
    var result = [];

 

    params.textToCompare.forEach((newText)=>{
        let distance = levenshtein.get(params.testBaseTextString, newText.testNewTextString); 

       let diff = diffJsSTT({
                    testBaseTextString: params.testBaseTextString, 
                    testBaseTextName:  params.testBaseTextName,
                    testNewTextString: newText.testNewTextString,
                    testNewTextName: newText.testNewTextName
                });
        diff.wordErrorRate =  distance;    
        result.push(diff);
    });

    return result;
}

module.exports = compareSTTServices;
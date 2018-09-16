const diffJsSTT  = require('./lib/diff-js-stt/index.js');
const worddiff = require('word-diff');
const jsdiff = require('diff');
const levenshtein = require('fast-levenshtein');


const calculateDiffStats = require('./lib/calculate-diff-stats/index.js');
const countWords = require('./lib/count-words/index.js');
const cleanUpTextInput = require('./lib/clean-up-text/index.js');
/**
 * allows to compare one or more stt automated transcription against an accurate, human transcription base one.
 * it returns some scores around
 * 
 * See example-usage.js file for example code.
 * 
 * @param {string} params.baseTextName - base text, accurate text for comparison, source of truth, generally human corrected text
 * @param {string} params.baseName - Name for the base text, eg 'Moby Dick - Book, Chapter 1'
 * @param {boolean} params.calculateWordErrorRateOption - optional get in results WER (word error rate) for the comparison, third party algo, 
 * @param {boolean} params.showDiffTextResults - optional get in results array of text diff objects
 * @param {Array} params.textToCompare -   array containing version to compare
 * @param {Object} params.textToCompare[0] - object containing info of version to comapre
 * @param {string} params.textToCompare[0].hypothesisText - the text to compare, eg the content of chapter one moby dick as trascribed by a STT/ASR service
 * @param {string} params.textToCompare[0].hypothesisName - the name of the text to compare
 * 
 */
// const fs = require('fs');
function compareText(params){

    let tmpBaseText = cleanUpTextInput(params.baseText);
    // To save sanitized base text to run comparison
    // fs.writeFileSync('./compare-text/sample-data/moby-dick-chapter-1/auto-sanitized-text/auto-sanitized-book-moby-dick-chapter-1.txt',tmpBaseText);
    let result = [];    
    
    params.textToCompare.forEach((newText)=>{
       
        let tmpHpText = cleanUpTextInput(newText.hypothesisText);
        let baseTextTotalNumberOfWords = countWords(tmpBaseText);
        // To save sanitized hp text to run comparison
        // fs.writeFileSync(`./compare-text/sample-data/moby-dick-chapter-1/auto-sanitized-text/auto-sanitized-${newText.hypothesisName.replace(/ /g,"_")}.txt`,tmpHpText);
        let diffResults = {
            baseTextwordCount: baseTextTotalNumberOfWords,
            hypothesisName: newText.hypothesisName,
            stats: {}
        };
       // WER algo - optional
        if(params.calculateWordErrorRateOption){
            diffResults.wordErrorRate =  levenshtein.get(tmpBaseText,tmpHpText);  
        }
        // // Dif algo - v1 
        // let diff = diffJsSTT({
        //     testBaseTextString: tmpBaseText, 
        //     testNewTextString:tmpHpText
        // });
        // diffResults.stats = diff;
        
        // Diff algo - v2
        let diff = worddiff.diffString(tmpBaseText, tmpHpText);
        diffResults.stats = calculateDiffStats(diff);
        // diff text results - optional
        if(params.showDiffTextResults){
            diffResults.diffs = diff;
        }
        // end v2 option

        // Diff algo - v3
        // let diff = jsdiff.diffWords(tmpBaseText, tmpHpText, {ignoreCase: true});
        // diffResults.stats = jsDiffcalculateDiffStats(diff);
        // // console.log(diff)
        //  if(params.showDiffTextResults){
        //     diffResults.diffs = diff;
        // }
        // end v3 option 

        diffResults.baseTextName = params.baseTextName;
        diffResults.hypothesisName = newText.hypothesisName
        result.push(diffResults);
    });
    // if requested WER, order results by Word Error Rate
    if(params.calculateWordErrorRateOption){
        result = orderByWer(result)
    }
    // return params;
    return result;
}

/**
 * order results by word error rate
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @param {*} statsResults 
 */
function orderByWer(statsResults){
    return statsResults.sort(function (a, b) {
        return a.wordErrorRate - b.wordErrorRate;
    });
}


// function jsDiffcalculateDiffStats(jsDiffList){
//     let statsResults = {
//         "matches": 0,
//         "deleted": 0,
//         "inserted": 0,
//         "substitutions": 'NA'
//     };
//     jsDiffList.forEach((diffItem)=>{
//         if(diffItem.added){
//             statsResults.inserted +=1;
//         }
//         else if(diffItem.removed){
//             statsResults.deleted +=1;
//         }
//         else{
//             statsResults.matches += countWords(diffItem.value);
//         }
//     })

//     return statsResults;
// }
module.exports = compareText;
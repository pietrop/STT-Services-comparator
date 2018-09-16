// const diffJsSTT  = require('./diff-js-stt/index.js');
const worddiff = require('word-diff');
const levenshtein = require('fast-levenshtein');
const convertNumberToWords= require('number-to-words').toWords;

const calculateDiffStats = require('./lib/calculate-diff-stats/index.js');
const countWords = require('./lib/count-words/index.js');
/**
 * allows to compare one or more stt automated transcription against an accurate, human transcription base one.
 * it returns some scores around
 * 
 * Example usage
 * 
 const book_MobyDickBookChapterOne = fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/book-moby-dick-chapter-1.txt').toString();
const assemblyAI_MobyDickBookChapterOne = fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/AssemblyAI-16-09-18-moby-dick-chapter-1.txt').toString();
const IBM_MobyDickBookChapterOne = fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/IBM-16-09-18-moby-dick-chapter-1.txt').toString();
const pocketsphinx_MobyDickBookChapterOne =  fs.readFileSync('./compare-text/sample-data/moby-dick-chapter-1/pocketsphinx-moby-dick-chapter-1.txt').toString();

 var result = compareText({
    baseText: book_MobyDickBookChapterOne, 
    baseName: 'Moby Dick - Book',
    calculateWordErrorRateOption: false, 
    showDiffTextResults: false,
    // can compare base text against multiple versions
    textToCompare : [
        {
            hypothesisText: assemblyAI_MobyDickBookChapterOne,
            hypothesisName: 'AssemblyAI'
        },
        {
            hypothesisText: IBM_MobyDickBookChapterOne,
            hypothesisName: 'IBM'
        },
        {
            hypothesisText: pocketsphinx_MobyDickBookChapterOne,
            hypothesisName: 'Pocketsphinx'
        }
    ]
});
 * 
 * returns an array containing comparison result objects 
 *
 [
  {
    "wordErrorRate": 12,
    "stats": {
      "matches": 196,
      "deleted": 0,
      "inserted": 1,
      "substitutions": 2
    },
    "diffs": [
      ... 
      // array of differences - see sample-data/diff-list.json for a longer list
        {
          "text": "it's "
        },
        {
          "remove": "hironic in eyesight ",
          "add": "I run they can hindsight "
        },
        ...
    ],
    "baseTextwordCount": 198
  },
  ...
]
 * 
 * @param {string} params.baseText - base text, accurate text for comparison, source of truth, generally human corrected text
 * @param {string} params.baseName - Name for the base text, eg 'Moby Dick - Book, Chapter 1'
 * @param {boolean} params.calculateWordErrorRateOption - optional get in results WER (word error rate) for the comparison, third party algo, 
 * @param {boolean} params.showDiffTextResults - optional get in results array of text diff objects
 * @param {Array} params.textToCompare -   array containing version to compare
 * @param {Object} params.textToCompare[0] - object containing info of version to comapre
 * @param {string} params.textToCompare[0].hypothesisText - the text to compare, eg the content of chapter one moby dick as trascribed by a STT/ASR service
 * @param {string} params.textToCompare[0].hypothesisName - the name of the text to compare
    // can compare base text against multiple versions
    textToCompare : [
        {
            hypothesisText: assemblyAI_MobyDickBookChapterOne,
            hypothesisName: 'AssemblyAI'
        },
        {
            hypothesisText: IBM_MobyDickBookChapterOne,
            hypothesisName: 'IBM'
        },
        {
            hypothesisText: pocketsphinx_MobyDickBookChapterOne,
            hypothesisName: 'Pocketsphinx'
        }
    ]
 * 
 */
const fs = require('fs');
function compareText(params){
    let tmpBaseText = cleanUpTextInput(params.baseText);
    fs.writeFileSync('./compare-text/sample-data/moby-dick-chapter-1/auto-sanitized-book-moby-dick-chapter-1.txt',tmpBaseText);
    console.log(tmpBaseText)
    let result = [];    
    
    params.textToCompare.forEach((newText)=>{

        let tmpHpText = cleanUpTextInput(newText.hypothesisText);
        
        let diffResults = {
            baseTextwordCount: countWords(tmpBaseText),
            hypothesisName: newText.hypothesisName,
            stats: {}
        };
       // WER algo - optional
        if(params.calculateWordErrorRateOption){
            diffResults.wordErrorRate =  levenshtein.get(tmpBaseText,tmpHpText);  
        }
        // Diff algo 
        var diff = worddiff.diffString(tmpBaseText, tmpHpText);
        diffResults.stats = calculateDiffStats(diff);
        // diff text results - optional
        if(params.showDiffTextResults){
            diffResults.diffs = diff;
        }
        diffResults.baseText = newText.baseText;
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

function cleanUpTextInput(text){
    // TODO: helper functions to :
    // - put everything on one line - account for \r\n as well.
    let textResult = removeLineBreaks(text);
    // - converting numbers to written form (eg, "7" -> "seven")
    textResult =  identifyNumbersDigitsAndConverToWords(textResult);
    // - lowercase all the text
    textResult = textResult.toLowerCase().trim();
    // - remove all punctuation - TODO: needs to take into account honorifics library.
    textResult = sanitise(textResult)
    return textResult;
}

// to add testing to this.
// with wordIsAstring
function identifyNumbersDigitsAndConverToWords(text){
    var transformedTextResult = "";
    // remove edges, to cover that edge case when there is space either side of the text string.
    var textResult = text.trim();
    // split text string in words
    textResult = textResult.split(" ");
    // iterate over words
    textResult.forEach((word)=>{
        // check if it's a word made of number digits
        if(isWordStringMadeOfNumberDigits(word)){
            transformedTextResult += convertNumberToWords(word) +" ";
        }
        else{
            // if number convert to number word -  convertNumberToWords(text)
            transformedTextResult += word+ " ";
        }
    })
    return transformedTextResult;
}

/**
 * checks if a string is made of number digits only 
 * @param {*} str - a string 
 * @return {boolean} - returns true if the strings contains only number digits, false if it deosn't.
 */
function isWordStringMadeOfNumberDigits(str){
    // TODO some scheck to see if a word is a string
    // https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
    if(/^\d+$/.test(str)){
        return true;
    }
    else{
        return false;
    }
}

/**
 * 
 * @param {*} str 
 */
function removeLineBreaks(str){
    return (str.replace(/\r\n/g, " ").replace(/\r/g, " ").replace(/\n/g, " "));
}

/**
 * remove all punctuation - TODO: needs to take into account honorifics library.
 * @param {*} str 
 */
function sanitise(str) {
    // TODO: hypen `-` replace is not working. not sure why. and it effects results coz hyphenated words count as one, and do not match.
	return (str.replace(/\./g, "").replace(/\-/g," ").replace(/-/g," ").replace(/;/g,"").replace(/,/g,"").replace(/\?/g, "").replace(/\!/g, "").replace(/,/g, "").replace(/’/g, "'").replace(/“/g, "").replace(/’/g, "”"));
}



module.exports = compareText;
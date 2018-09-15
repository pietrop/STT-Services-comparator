// const diffJsSTT  = require('./diff-js-stt/index.js');
const worddiff = require('word-diff');
const levenshtein = require('fast-levenshtein');
const convertNumberToWords= require('number-to-words').toWords;

const calculateDiffStats = require('./lib/calculate-diff-stats.js');
const countWords = require('./lib/count-words.js');
/**
 * allows to compare one or more stt automated transcription against an accurate, human transcription base one.
 * it returns some scores around
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
 */
function compareSTTServices(params){
    let tmpBaseText = params.baseText;
    let result = [];    
    
    params.textToCompare.forEach((newText)=>{

        let tmpHpText = newText.hypothesisText;
        
        let diffWerResults = {
            wordErrorRate: 0, 
            stats: {}
            
        };
        tmpBaseText = cleanUpTextInput(tmpBaseText);
        tmpHpText = cleanUpTextInput(tmpHpText);
       // WER algo 
        diffWerResults.wordErrorRate =  levenshtein.get(tmpBaseText,tmpHpText);  
        // Diff algo 
        var diff = worddiff.diffString(tmpBaseText, tmpHpText);

        diffWerResults.stats = calculateDiffStats(diff);
        // TODO: uncomment this when ready with the stats
        diffWerResults.diffs = diff;
        diffWerResults.baseTextwordCount = countWords(tmpBaseText);
        result.push(diffWerResults);
    });
    // return params;
    return result;
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

// TODO: this can be axtracted as separate module in lib, with folder, 
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
	return (str.replace(/\./g, "").replace(/;/g,"").replace(/,/g,"").replace(/\?/g, "").replace(/\!/g, "").replace(/,/g, "").replace(/’/g, "'").replace(/“/g, "").replace(/’/g, "”"));
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

module.exports = compareSTTServices;
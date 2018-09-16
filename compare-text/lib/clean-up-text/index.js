const convertNumberToWords= require('number-to-words').toWords;

function cleanUpTextInput(text){
    // TODO: helper functions to :
    // - put everything on one line - account for \r\n as well.
    let textResult = removeLineBreaks(text);
    // - converting numbers to written form (eg, "7" -> "seven")
    textResult =  identifyNumbersDigitsAndConverToWords(textResult);
    // - lowercase all the text
    textResult = textResult.toLowerCase().trim();
    // - remove all punctuation - TODO: needs to take into account honorifics library? maybe not.
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
	return (str.replace(/\./g, "").replace(/-/g," ").replace(/;/g,"").replace(/,/g,"").replace(/\?/g, "").replace(/\!/g, "").replace(/,/g, "").replace(/’/g, "'").replace(/“/g, "'").replace(/”/g, "'").replace(/\"/g, "'"));
}


module.exports = cleanUpTextInput;
// module.exports.sanitise = sanitise;
// module.exports.removeLineBreaks = removeLineBreaks;
// module.exports.isWordStringMadeOfNumberDigits = isWordStringMadeOfNumberDigits;
// module.exports.identifyNumbersDigitsAndConverToWords = identifyNumbersDigitsAndConverToWords;
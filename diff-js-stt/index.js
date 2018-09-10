
/**
 * diffUsingJS
 * @param {Number} viewType : 0 == sidebyside | 1 == inline
 */

const difflib = require('./difflib.js');
const diffview = require('./diffview.js');


 /**
  * diffUsingJS compare function 
  * 
  * @param {String} params.testBaseTextString - Base text for the comparison, eg human accurate proofread
  * @param {String} params.testBaseTextName - Name to give to base text
  * @param {String} params.testNewTextString - Text to compare with original, eg STT automated transcription
  * @param {String} params.testNewTextName - - Name to text to compare
  * 
  * example usage
  * 
   diffJsSTT({
    testBaseTextString: testBaseText, 
    testBaseTextName: 'original text',
    testNewTextString: testNewText,
    testNewTextName: 'some text from a STT service'
});
  * 
  */
function diffUsingJS( params){
    
    // console.log(params)
    //  from index.html - https://github.com/pietrop/stt-quality/blob/master/docs/index.html
    var base = difflib.stringAsLines(sanitise(params.testBaseTextString));
    var newtxt = difflib.stringAsLines(sanitise(params.testNewTextString));
    var sm = new difflib.SequenceMatcher(base, newtxt);
    var opcodes = sm.get_opcodes();
    var contextSize = "";

    // console.log(base)
    // console.log('/----------------/')
    // console.log(newtxt)
    // console.log('//----------------//')
    // console.log(sm)
    // console.log('//----------------//')
    // console.log(opcodes)
    var result = diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        baseTextName: "Base Text",
        newTextName: "New Text",
        contextSize: contextSize
    });

    result.baseTextName = params.testBaseTextName;
    result.newTextName = params.testNewTextName;
    return result;
}


function sanitise(str) {
	return (str.replace(/ /g, "\n").replace(/\./g, "").replace(/,/g, "").replace(/’/g, "'").replace(/“/g, "").replace(/’/g, "”").toLowerCase());
}

module.exports = diffUsingJS;

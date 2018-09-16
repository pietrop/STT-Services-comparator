const diffJsSTT  = require('./index.js');

var testBaseText = "it's hironic in eyesight this is one week before nine eleven and two of the slides that later I realized oh my goodness you know I say this one week and the next week we're doing just the opposite one is I can't recited exactly it says never do anything to puff shade skew taylor massage or otherwise exaggerate statements of fact that's one slide";

var testNewText = "it's I run they can hindsight this is one week before nine eleven and two of the slides that later I realized all my goodness you know I say this one week and the next week we're doing just the opposite one as I can't recited exactly but this is never do anything to puff shade skew Taylor my size or otherwise exaggerate statements of fact that's one slight";

var result = diffJsSTT({
    testBaseTextString: testBaseText, 
    testBaseTextName: 'original text',
    testNewTextString: testNewText,
    testNewTextName: 'some text from a STT service'
});

console.log(result);
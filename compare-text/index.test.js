const compareText  = require('./index.js');


describe('Diff - same sentence', () => {
    // same text - expecting wer == 0, and delete == 0
    const optionsSame = {
        baseText: 'Call me Ishmael. Some years ago—never mind how long', 
        baseName: 'original text',
    //     // can compare base text against multiple versions
        textToCompare : [
            {
                hypothesisText: 'Call me Ishmael. Some years ago—never mind how long',
                hypothesisName: 'HP title'
            }
        ]
    };
    let diff = compareText(optionsSame);

    test('matched', () => {
        // 9 words in sample sentence
        expect(diff[0].stats.matches).toBe(9);
    })
     test('deleted', () => {
         expect(diff[0].stats.deleted).toBe(0);
    })
    test('inserted', () => {
        expect(diff[0].stats.inserted).toBe(0);
    })
    test('substitutions', () => {
        expect(diff[0].stats.substitutions).toBe(0);
    })
})

describe('Diff - one extra word in hypothesis text ', () => {
    // same text - expecting wer == 0, and delete == 0
    const optionsOneExtra = {
        baseText: 'Call me Ishmael. Some years ago—never mind how long', 
        baseName: 'original text',
    //     // can compare base text against multiple versions
        textToCompare : [
            {
                hypothesisText: 'Call me Ishmael. Some EXTRAWORD years ago—never mind how long',
                hypothesisName: 'HP title'
            }
        ]
    };
    let diff = compareText(optionsOneExtra);
    test('matches', () => {
        expect(diff[0].stats.matches).toBe(9);
    })
    xtest('substitutions', () => {
        expect(diff[0].stats.substitutions).toBe(0);
    })
    test('deleted', () => {
        expect(diff[0].stats.deleted).toBe(0);
    })
    test('inserted', () => {
        expect(diff[0].stats.inserted).toBe(1);
    })
})


describe('Diff - one delete word in hypothesis ', () => {
    // same text - expecting wer == 0, and delete == 0
    const optionsOneExtra = {
        baseText: 'Call me Ishmael. Some years ago—never mind how long', 
        baseName: 'original text',
    //     // can compare base text against multiple versions
        textToCompare : [
            {
                hypothesisText: 'Call me Ishmael. years ago—never mind how long',
                hypothesisName: 'HP title'
            }
        ]
    };
    let diff = compareText(optionsOneExtra);
    test('matches', () => {
        expect(diff[0].stats.matches).toBe(8);
    })
    xtest('substitutions', () => {
        expect(diff[0].stats.substitutions).toBe(0);
    })
    test('deleted', () => {
        expect(diff[0].stats.deleted).toBe(1);
    })
    test('inserted', () => {
        expect(diff[0].stats.inserted).toBe(0);
    })
})

describe('Diff - one substituion word in hypothesis ', () => {
    // same text - expecting wer == 0, and delete == 0
    const optionsOneExtra = {
        baseText: 'Call me Ishmael. Some years ago—never mind how long', 
        baseName: 'original text',
    //     // can compare base text against multiple versions
        textToCompare : [
            {
                hypothesisText: 'Call me Ishmael. MANY years ago—never mind how long',
                hypothesisName: 'HP title'
            }
        ]
    };
    let diff = compareText(optionsOneExtra);
    test('matches', () => {
        expect(diff[0].stats.matches).toBe(8);
    })
    xtest('substitutions', () => {
        expect(diff[0].stats.substitutions).toBe(1);
    })
    test('deleted', () => {
        expect(diff[0].stats.deleted).toBe(0);
    })
    test('inserted', () => {
        expect(diff[0].stats.inserted).toBe(0);
    })
})


describe('Diff - two substituion and one deletion in hypothesis ', () => {
    // same text - expecting wer == 0, and delete == 0
    const optionsOneExtra = {
        baseText: 'Call me Ishmael. Some years ago—never mind how long', 
        baseName: 'original text',
    //     // can compare base text against multiple versions
        textToCompare : [
            {
                hypothesisText: 'Call me Ishmael. MANY GEARS mind how long',
                hypothesisName: 'HP title'
            }
        ]
    };
    let diff = compareText(optionsOneExtra);
    test('matches', () => {
        expect(diff[0].stats.matches).toBe(6);
    })
    test('substitutions', () => {
        expect(diff[0].stats.substitutions).toBe(2);
    })
    test('deleted', () => {
        expect(diff[0].stats.deleted).toBe(1);
    })
    test('inserted', () => {
        expect(diff[0].stats.inserted).toBe(0);
    })
})

describe('Diff - one substituion and two deletion in hypothesis ', () => {
    // same text - expecting wer == 0, and delete == 0
    const optionsOneExtra = {
        baseText: 'Call me Ishmael. Some years ago—never mind how long', 
        baseName: 'original text',
    //     // can compare base text against multiple versions
        textToCompare : [
            {
                hypothesisText: 'Call me Ishmael. RANDOM mind how long',
                hypothesisName: 'HP title'
            }
        ]
    };
    let diff = compareText(optionsOneExtra);
    test('matches', () => {
        expect(diff[0].stats.matches).toBe(6);
    })
    test('substitutions', () => {
        expect(diff[0].stats.substitutions).toBe(1);
    })
    test('deleted', () => {
        expect(diff[0].stats.deleted).toBe(2);
    })
    test('inserted', () => {
        expect(diff[0].stats.inserted).toBe(0);
    })
})



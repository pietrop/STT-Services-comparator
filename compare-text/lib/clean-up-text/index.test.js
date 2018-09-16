const cleanUpTextInput = require('./index.js');

describe('Clean up text', () => {
    test('lower case sentences', () => {
        const sampleTextCapitalized = 'Call me Ishmael Some years ago never mind how long';
        expect(cleanUpTextInput(sampleTextCapitalized)).toBe('call me ishmael some years ago never mind how long')
    })

    test('punctuation . , ! ?', () => {
        const sampleTextpunctuation = 'call me Ishmael. some; years ago, never! mind how long?';
        expect(cleanUpTextInput(sampleTextpunctuation)).toBe('call me ishmael some years ago never mind how long')
    })

    test('quotation', () => {
        const sampleTexwithQuotations= `call 'me' "ishmael" some “years” ago it’s never mind how long`;
        expect(cleanUpTextInput(sampleTexwithQuotations)).toBe(`call 'me' 'ishmael' some 'years' ago it's never mind how long`)
    })

    test('remove line break', () => {
        // using \n for mac, \r for older mac, \r\n for pc. (?)
        const sampleTexwithlineBreaks= `call me\nishmael\rsome years ago never\r\nmind how long`;
        expect(cleanUpTextInput(sampleTexwithlineBreaks)).toBe(`call me ishmael some years ago never mind how long`)
    })

    test('convert number digits in string to letters', () => {
        const sampleTexwithNumberDigits= `call me ishmael 7 some years 25 ago never mind 200 how long`;
        expect(cleanUpTextInput(sampleTexwithNumberDigits)).toBe(`call me ishmael seven some years twenty five ago never mind two hundred how long`)
    })

    test('remove preceeding and trailing spaces', () => {
        const sampleTexwithPreceedingAndTrailingSpaces= ` call me ishmael some years ago never mind how long `;
        expect(cleanUpTextInput(sampleTexwithPreceedingAndTrailingSpaces)).toBe(`call me ishmael some years ago never mind how long`)
    })

    test('remove hypen - ', () => {
        // TODO: are there a few different "type of hypen? similar to " symbol?
        const sampleTexwithHyphen= ` call me ishmael some years-ago never mind how-long `;
        expect(cleanUpTextInput(sampleTexwithHyphen)).toBe(`call me ishmael some years ago never mind how long`)
    })
})
const countWords = require('./index.js');

describe('calculate diff stats - module', () => {
    test('calculate diff stats', () => {
        const sampleTextOne = 'Call me Ishmael. Some years ago never mind how long';
        expect(countWords(sampleTextOne)).toBe(10)
    })

    test('calculate diff stats - handle trailing space', () => {
        const sampleTextWithTrailingSpace = 'Call me Ishmael. Some years ago never mind how long ';
        expect(countWords(sampleTextWithTrailingSpace)).toBe(10)
    })

    test('calculate diff stats - count words with hypen as one', () => {
        const sampleTextWithTrailingSpace = 'Call me Ishmael. Some years ago-never mind how long ';
        expect(countWords(sampleTextWithTrailingSpace)).toBe(9)
    })
})
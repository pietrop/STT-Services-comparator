
const calculateDiffStats = require('./index.js');
// const diffList = require('../../sample-data/diff-list.json');

const diffList = [
    {
      "text": "it's "
    },
    {
      "remove": "hironic in eyesight ",
      "add": "I run they can hindsight "
    },
    {
      "text": "this is one week before nine eleven and two of the slides that later I realized "
    },
    {
      "remove": "oh ",
      "add": "all "
    },
    {
      "text": "my goodness you know I say this one week and the next week we're doing just the opposite one "
    },
    {
      "remove": "is ",
      "add": "as "
    },
    {
      "text": "I can't recited exactly "
    },
    {
      "remove": "it says ",
      "add": "but this is "
    },
    {
      "text": "never do anything to puff shade skew "
    },
    {
      "remove": "taylor massage ",
      "add": "Taylor my size "
    },
    {
      "text": "or otherwise exaggerate statements of fact that's one "
    },
    {
      "remove": "slide",
      "add": "slight"
    }
  ]
const expectedOutput = {
    "matches": 55,
    "deleted": 0,
    "inserted": 4,
    "substitutions": 10
  };
  
describe('calculate diff stats - module', () => {
    test('calculate diff stats', () => {
        expect(calculateDiffStats(diffList)).toEqual(expectedOutput)
    })
})
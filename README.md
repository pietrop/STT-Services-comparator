# STT Services comparator

Allows to compare a base accurate text, with a new hypothesis one.

Example use cases
- STT(speech to text)/ASR(automatic speech recognition) automated transcription against an accurate, human transcription base one.
- Automated translation against a human accurate translation. 



## Setup

_stack - optional_

_How to build and run the code/app_

 
## Usage

```js 
const fs = require('fs');
const compareSTTServices  = require('./index.js');

const testBaseText = fs.readFileSync('./sample-data/base-text-1.txt').toString();
const testNewText = fs.readFileSync('./sample-data/hypothesis-text-1.txt').toString();


var result = compareSTTServices({
    baseText: testBaseText, 
    baseName: 'original text',
//     // can compare base text against multiple versions
    textToCompare : [
        {
            hypothesisText: testNewText,
            hypothesisName: 'some text from a STT service'
        }
        //,
        // {
        //     hypothesisText: testNewText,
        //     hypothesisName: 'some text from a STT service'
        // }
    ]
});

console.log(JSON.stringify(result,null,2));
```

see `example-usage.js`.

## System Architecture

_High level overview of system architecture_

The main function returns an array with some scores as follows

```json
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
    ],tou
    "baseTextwordCount": 198
  },
  ...
]
```

 [`word-diff`](https://www.npmjs.com/package/word-diff) is used to calculate the differences, and `lib/calculate-diff-stats.js` is used to aggregate the differences and work out:

- `matched`: words that are both in based and new text
- `replaced`: words that in new text have been replaced from base text
- `inserted`: words that are not in base text, and have been inserted into new text
- `deleted`: words present in base text but not new text.

- `baseTextwordCount`: total number of words in base, accurate, text.
- `diffs`:  array of differences, what [`word-diff`](https://www.npmjs.com/package/word-diff) module returns, see `./sample-data/diff-list.json` for a longer list.

Where base text is the accurate (human proofread) transcription, and new text is the STT automated transcription we are trying to score.


[`fast-levenshtein`](https://github.com/hiddentao/fast-levenshtein) module is used to calculate the WER (Word Error Rate) a common meause of STT/ASR accuracy for these system.


## Development env

 _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_

- node
- npm 
 

## Build
_How to run build_

 

## Tests
_How to carry out tests_

Test using `jest`

```
npm test
```

## Deployment

_How to deploy the code/app into test/staging/production_

...

----
## background 

Originally inspired from dffijs Mark Boas [`stt-quality`](https://github.com/hyperaudio/stt-quality) (see [demo here](http://pietropassarelli.com/stt-quality/)) which is a fork of [jsdifflib](https://github.com/cemerick/jsdifflib).

But then refactored using [`word-diff`](https://www.npmjs.com/package/word-diff) module for ease of use.



<!-- 
Ideal input

- accurate transcription for base
- media file to sent to STT service
- credentials for stt service, eg .env file. + config UI?

- output 
  - stats
  - visual comparison
  - some kind of ranking that tells you witch one is more accurate?
    - eg can chose by matched, deleted, etc..

 -->

<!-- ---

## Background Idea

The idea is to do a review of stt services and figure out a programmatic way to compare their output to give them a score and establish who is best. 

But what would be better then this? Having a system that can generate such report, to keep up to date with latest changes.

Perhaps an electron app, that generates/updates a jeckyll site. in `docs` folder so that can be deploied on github pages. using the `/data` folder. adds results/report in data folder, and jeckyll site uses the report to generate a human friendly redable report. 

This way it is extensible. it should be easier to fork and add a new service to the mix. 

Idea is to have a settings panel where user can add credential to various services. 

credentials saved in user local library so never risk of push. 

It needs a video or audio file and the accurate human transcription as starting point.

core of the app calls the services, receives the jsons, saves them so that the schema of those jsons can be showed. 
extract text from responses, this needs to costumised on a case by case basis. 

Uses Mark hyperaudio transcription comparison app (?name?) component to rank. 

packages this info into a report. 

Hopefully this a sensible way to help in the decision of which stt to use for next project, with the most up to date info for each stt service.  -->

/**
 * 
 * 
 * example diffs
 [
      {
        "text": "it's "
      },
      {
        "remove": "hironic in eyesight ",
        "add": "I run they can hindsight "
      },
      ....
    ]
  }
]
 * 
 */

/**
 * helper function to count words in a string.
 */
const fs = require('fs');
const countWords = require('./count-words.js');




function calculateDiffStats(diffList){
//   console.log('diffList',diffList)
//  fs.writeFileSync('./sample-data/diff-list.json', JSON.stringify(diffList,null,2) );
    let statsResult = {
        matches: 0, 
        deleted: 0,
        inserted: 0,
        substitutions: 0 
    }
    statsResult.matches = calculateMatches(diffList);
    statsResult.substitutions = calculateSubstitutions(diffList);
    statsResult.deleted = calculateDeleted(diffList);
    statsResult.inserted = calculateInserted(diffList);
  
    return statsResult;
}

/**
 *  returns number of matches
 */
function calculateMatches(diffList){
    // returns array list of lines word counts of matches
    // eg returns [ 1, 0, 16, 0, 19, 0, 4, 0, 7, 0, 8, 0 ]
    let tmpMatchesList = diffList.map((diffItem)=>{
        if(diffItem.text !== undefined){
            return countWords(diffItem.text);
        }
        else {
            return 0;
        }
    })
    // total word count of matches by sum all line words count 
    return tmpMatchesList.reduce((x, y) => x + y);
}

/**
 * 
 */
function calculateSubstitutions(diffList){
    // 
    let tmpMatchesList = diffList.map((diffItem)=>{
        // first it needs to be an object with remove or add otherwise not in this use case. - otherwise it's just matches.
        if((diffItem.remove !== undefined) ){
            let removedWordsCount   = countWords(diffItem.remove);
            let addedWordsCount     = countWords(diffItem.add);
            // case 1 - same number of words in remove and add attribute
            if(removedWordsCount === addedWordsCount){
                return  removedWordsCount;
            }
            // case 2 - there are more words in remove then add 
            // eg { remove: 'but this is ',     // 3
            //       add: 'it says ' },         // 2
            // add: 2 ==> substituions
            else if(removedWordsCount > addedWordsCount){
               return addedWordsCount;
            }
            // case 3 - there are less words in remove then add 
            // eg { remove: 'hironic in eyesight ',  // 3
            //      add: 'i run they can hindsight ' }, // 5
            // remove: 3 ==> substituions 
            else if(removedWordsCount < addedWordsCount){
                return removedWordsCount;
            }
            // case 4 - does not meet any of the criterias identified as substituions
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    })
    // 
    return tmpMatchesList.reduce((x, y) => x + y);
}

/**
 * 
 */
function calculateDeleted(diffList){
    let tmpMatchesList = diffList.map((diffItem)=>{
        // first it needs to be an object with remove or add otherwise not in this use case. - otherwise it's just matches.
        if((diffItem.remove !== undefined) ){
            let removedWordsCount   = countWords(diffItem.remove);
            let addedWordsCount     = countWords(diffItem.add);
            // case 1 - in remove but none in add, 
            // means word has been deleted from base text
            // eg { remove: 'somewordnotepresentinhp ', 
            //      add: '' },
            if( addedWordsCount === 0){
               return removedWordsCount;
            }
            // case 3 -  more in remove then add ==> the extra one are deleted words 
            // there are more words in remove then add 
            // eg { remove: 'but this is ',     // 3
            //       add: 'it says ' },         // 2
            // 3-1: 1 ==> deleted
            else if(removedWordsCount > addedWordsCount){
                return removedWordsCount - addedWordsCount;
            }
            // case 3 - does not meet any of the criterias identified as delete
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    })
    // 
    // console.log('deleted ',tmpMatchesList);
    return tmpMatchesList.reduce((x, y) => x + y);
}

/**
 * 
 */
function calculateInserted(diffList){
    let tmpMatchesList = diffList.map((diffItem)=>{
        // first it needs to be an object with remove or add otherwise not in this use case. - otherwise it's just matches.
        if((diffItem.remove !== undefined) ){
            let removedWordsCount   = countWords(diffItem.remove);
            let addedWordsCount     = countWords(diffItem.add);
            // case 1 - in   but not in remove, 
            // means word has been added in the hypothesis text
            // eg { remove: '', 
            //      add: 'insertedinhp ' }
            if( removedWordsCount  === 0){
               return addedWordsCount;
            }
            // case 2 -  more in remove then add ==> the extra one are inserted in hp 
            // there are more words in remove then add 
            // eg { remove: 'it says  ',     // 2
            //       add: 'but this is ' },         // 3
            // 3-2: 1 ==> inserted
            else if(removedWordsCount < addedWordsCount){
                return addedWordsCount - removedWordsCount;
            }
            // case 3 - does not meet any of the criterias identified as inserted
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    })
    // 
    // console.log('inserted ',tmpMatchesList);
    return tmpMatchesList.reduce((x, y) => x + y);
}

module.exports = calculateDiffStats;

const calculateDiffStats = require('./index.js'); 
const diffList = require('../../sample-data/diff-list.json');

var result = calculateDiffStats(diffList);

console.log(JSON.stringify(result,null,2));
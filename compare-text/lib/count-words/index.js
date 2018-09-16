function countWords(wordString){
    if(wordString === " " || wordString === ""){
      return 0;
    }else{
      return wordString.trim().split(' ').length;
    }
  }

module.exports = countWords;
function rot13(str) {

  const ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var decodedSentence = [],
    decodedWord = "",
    hasSign = false;

  //remove end of sentence sign for decoding
  if (/[.!?]/.test(str)) {
    hasSign = true;
    var sign = str.match(/[.!?]/);
    str = str.replace(/[.!?]/, '');
  }

  str.split(" ").forEach((word, i, arr) => {
    for (let j = 0; j < arr[i].length; j++) {
      let oldIndex = ALPH.lastIndexOf(word[j]);
      decodedWord += ALPH[oldIndex - 13];
    }
    decodedSentence.push(decodedWord);
    decodedWord = "";
  })

  decodedSentence = decodedSentence.join(" ")

  //add back end of sentence sign for decoding
  if (hasSign) {
    decodedSentence += sign;
  }

  return decodedSentence;

}

console.log(rot13("SERR CVMMN!"));

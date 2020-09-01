function convertToRoman(num) {
  const numArr = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000]
  const lookUp = {
    1: "I", 4: "IV", 5: "V", 9: "IX", 10: "X", 40: "XL", 50: "L",
    90: "XC", 100: "C", 400: "CD", 500: "D", 900: "CM", 1000: "M"
  }
  var romanNum = [];
  var arabicNum;
  while (num != 0) {
    //find matching number in array
    if (num > 1000) {
      arabicNum = 1000;
    } else {
      arabicNum = numArr.filter(function (val, i, arr) {
        return num == val | (num > val && num < arr[i + 1])
      })
    }
    //find matching roman number for arabic number   
    romanNum.push(lookUp[arabicNum]);
    num -= arabicNum;
  }
  return romanNum.join("");
}

convertToRoman(1004);

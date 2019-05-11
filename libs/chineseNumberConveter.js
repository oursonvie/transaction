chineseNumberDict = {
  1:'壹',
  2:'贰',
  3:'叁',
  4:'肆',
  5:'伍',
  6:'陆',
  7:'柒',
  8:'捌',
  9:'玖',
  0:'零'
}

chineseUnitDict = {
  0:'仟',
  1:'佰',
  2:'拾',
  3:'万',
  4:'仟',
  5:'佰',
  6:'拾',
  7:'圆',
  8:'角',
  9:'分'
}

chineseNumberFormatter = (number) => {

  // split whole number into digis
  splitdNumber = number.split('.')
  paddedNumber = splitdNumber[0].padStart(8, 'x');

  // handle whole number
  digis = {
    0:paddedNumber[0],
    1:paddedNumber[1],
    2:paddedNumber[2],
    3:paddedNumber[3],
    4:paddedNumber[4],
    5:paddedNumber[5],
    6:paddedNumber[6],
    7:paddedNumber[7],
  }

  wholeNumber = []

  for(i=0;i<8;i++) {
    wholeNumber+= (digis[i] == 'x') ? '' : `${chineseNumberDict[digis[i]]}${chineseUnitDict[i]}`
  }

  // handle digits
  digits = splitdNumber[1]
  digitsNumber = ''

  if (digits[0] == '0' && digits[1] == '0') {
    digitsNumber = ''
  } else if ( digits[0] == '0') {
    digitsNumber = `${chineseNumberDict[digits[1]]}分`
  } else if ( digits[1] == '0' ) {
    digitsNumber = `${chineseNumberDict[digits[0]]}角`
  } else {
    digitsNumber = `${chineseNumberDict[digits[0]]}角${chineseNumberDict[digits[1]]}分`
  }

  finalStr = `${wholeNumber}${digitsNumber}`

  return finalStr

}

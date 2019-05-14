// render function starts here
printChongkuan = (object) => {

  // process amount into digits
  removeDotNumberStr = object.returnAmount.replace('.','')
  paddedNumberStr = removeDotNumberStr.padStart(10, 'x');

  // find last x
  replaceIndex = paddedNumberStr.lastIndexOf("x")
  // replace the x to $
  if (replaceIndex != -1) {
    paddedNumberStr = replaceAt(paddedNumberStr, replaceIndex, '￥')
  }

  console.log(paddedNumberStr)

  digis = {
    0:paddedNumberStr[0],
    1:paddedNumberStr[1],
    2:paddedNumberStr[2],
    3:paddedNumberStr[3],
    4:paddedNumberStr[4],
    5:paddedNumberStr[5],
    6:paddedNumberStr[6],
    7:paddedNumberStr[7],
    8:paddedNumberStr[8],
    9:paddedNumberStr[9]
  }

  object.digis = digis

  console.log(object)

  // start pdf formatting
  let docPDF = {

    // page setting
    pageSize: {
      width: 683,
      height: 397
    },
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: 'msyh',
      fontSize: 10
    },

    content: [

      {
        text: '西安交通大学继续教育学院暂付款冲销单',
        alignment: 'center',
        fontSize: 18
      },

      {
        text: 'NO:0000000',
        alignment: 'right',
        fontSize: 12
      },

      {
        columns: [{
            width: '*',
            text: '部门: 远程教育中心',
            fontSize: 12,
            margin: [0, 10]
          },
          {
            width: '*',
            text: `${object.date}`,
            fontSize: 12,
            margin: [0, 10]
          },
          {
            width: '*',
            text: '借款人姓名:',
            fontSize: 12,
            margin: [0, 10]
          }
        ]
      },

      {
        table: {
          body: [
            [{
                text: '借款原因',
                rowSpan: 2,
                alignment: 'center',
                fontSize: 12
              },
              {
                text: '对方单位名称',
                rowSpan: 2,
                alignment: 'center',
                fontSize: 12
              },
              {
                text: '对方单位账号',
                rowSpan: 2,
                alignment: 'center',
                fontSize: 12
              },
              {
                text: '对方单位开户行',
                rowSpan: 2,
                alignment: 'center',
                fontSize: 12
              },
              {
                text: '原领款金额',
                colSpan: 10,
                alignment: 'center',
                fontSize: 12
              },
              {}, {}, {}, {}, {}, {}, {}, {}, {}
            ],
            [{}, {}, {}, {}, '千', '百', '十', '万', '千', '百', '十', '元', '角', '分'],
            ['借1903批次学费返款', `${object.bankDetail.name}`, `${object.bankDetail.accountno}`, `${object.bankDetail.branchname}`,
            (object.digis[0] == 'x') ? '' : object.digis[0],
            (object.digis[1] == 'x') ? '' : object.digis[1],
            (object.digis[2] == 'x') ? '' : object.digis[2],
            (object.digis[3] == 'x') ? '' : object.digis[3],
            (object.digis[4] == 'x') ? '' : object.digis[4],
            (object.digis[5] == 'x') ? '' : object.digis[5],
            (object.digis[6] == 'x') ? '' : object.digis[6],
            (object.digis[7] == 'x') ? '' : object.digis[7],
            (object.digis[8] == 'x') ? '' : object.digis[8],
            (object.digis[9] == 'x') ? '' : object.digis[9]],
            [{
              text: `暂领共计人民币(大写) ${digitUppercase(object.returnAmount)}`,
              colSpan: 14,
              fontSize: 12,
              margin:[0,20]
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{
              text: `备注: ${ (object.bankDetail.memo) ? object.bankDetail.memo : ''}`,
              colSpan: 4,
              fontSize: 12
            }, {}, {}, {}, {
              text: '科目',
              colSpan: 10,
              alignment: 'center',
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{
              text: '',
              colSpan: 4,
              rowSpan: 2,
              border: [true, true, true, false]
            }, {}, {}, {}, {
              text: '借方:',
              colSpan: 10,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}, ],
            [{}, {}, {}, {}, {
              text: '贷方:',
              colSpan: 10,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}, ],
            [{
              columns: [{
                  width: '*',
                  text: '财务主管:',
                  fontSize: 12
                },
                {
                  width: '*',
                  text: '主管院长:',
                  fontSize: 12
                },
                {
                  width: '*',
                  text: '部门负责人:',
                  fontSize: 12
                },
                {
                  width: '*',
                  text: '领款人:',
                  fontSize: 12
                },
              ],
              colSpan: 4,
              border: [true, false, true, true]
            }, {}, {}, {}, {
              text: '财务审核(章):',
              colSpan: 10,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}, ],
          ]
        }
      }

    ],
    styles: {
      subtitle: {
        marginTop: 5,
        fontSize: 14,
        bold: true,
        decorationStyle: 'solid',
        decorationColor: 'black'
      },
      title: {
        marginTop: 5,
        fontSize: 14,
        bold: true,
        decoration: 'underline',
        decorationStyle: 'solid',
        decorationColor: 'black'
      },
      centerTable: {
        alignment: 'center',
      }
    }

  }

  return docPDF

}

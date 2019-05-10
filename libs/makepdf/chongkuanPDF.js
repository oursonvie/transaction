// render function starts here
printChongkuan = (object) => {

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
        text: 'NO:000000',
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
            text: '2019年04月21日',
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
          widths: [65,110,110,110,8,8,8,8,8,8,8,8,8,8],
          heights: [10,10,30,40,40,20,20,20],
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
            ['借1903批次学费返款', 'Another one here', 'OK?', 'OK?', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2'],
            [{
              text: '暂领共计人民币(大写)',
              colSpan: 14,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{
              text: '备注:',
              colSpan: 7,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}, {
              text: '科目',
              colSpan: 7,
              alignment: 'center',
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}],
            [{
              text:'',
              colSpan: 7,
              rowSpan: 2,
              border: [true, true, true, false]
            }, {}, {}, {}, {}, {}, {}, {
              text: '借方:',
              colSpan: 7,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {
              text: '贷方:',
              colSpan: 7,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}],
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
              colSpan: 7,
              border: [true, false, true, true]
            }, {}, {}, {}, {}, {}, {}, {
              text: '财务审核(章):',
              colSpan: 7,
              fontSize: 12
            }, {}, {}, {}, {}, {}, {}],
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

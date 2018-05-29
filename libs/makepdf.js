let convertFeesTable = (feesDetail, feesInfo) => {

  let centerView = []

  _.forEach(feesDetail, function(center) {
    // for each center in the list

    header = [
      {text:`${center.name}`, colSpan: 4, alignment: 'center'},
      {},
      {},
      {}
    ]

    centerView.push(header)

    _.forEach(center.paymentdetail, function(payment) {
      let row = [
        `${payment._id}`,
        `${payment.studentcount}`,
        `银联缴费`,
        `${payment.totalFee}`
      ]
      centerView.push(row)
    })

  })

  // add extra at the end
  let extraRow = [
    '',
    '',
    '汇款缴费',
    ((!feesInfo.extraAmount) ? '' : feesInfo.extraAmount)
  ]

  centerView.push(extraRow)

  // push last sum row at the end

  let sumRow = [
    `合计`,
    ``,
    ``,
    `${feesInfo.total}`
  ]

  centerView.push(sumRow)


  return centerView

}

let feesSplitTable = (feesInfo) => {

  let view = []

  let header = [
    {text:'结算金额', rowSpan: 2, alignment: 'center'},
    {text:'学习中心', colSpan: 2, alignment: 'center'},
    {},
    {text:'学校', colSpan: 2, alignment: 'center'},
    {}
   ]

   view.push(header)

  let secondRow = [
    '',
    '分配比例',
    '分配金额（元）',
    '分配比例',
    '分配金额（元）'
  ]

  view.push(secondRow)

  let dataRow = [
    {text: feesInfo.total, alignment: 'right'},
    {text: feesInfo.currentratio, alignment: 'right'},
    {text: feesInfo.lcenterAmount, alignment: 'right'},
    {text: feesInfo.xjturatio, alignment: 'right'},
    {text: feesInfo.xjtuamount, alignment: 'right'},
  ]

  view.push(dataRow)

  //empty row

  let emptyRow = [' ', ' ', ' ', ' ', ' ']
  view.push(emptyRow)

  // sumrow
  let sumRow = [
    {text: `合计`, alignment: 'center'},
    ``,
    {text: `${feesInfo.lcenterAmount}`, alignment: 'right'},
    ``,
    {text: `${feesInfo.xjtuamount}`, alignment: 'right'},
  ]

  view.push(sumRow)

  return view
}

makeRenderObject = (object) => {

  // start pdf formatting
  let docPDF = {

    content: [

      {
        text: '学费结算确认函',
        alignment: 'center',
        fontSize: 24
      },

      {
        text: `${object.districtCenter.name} 学习中心:`,
        alignment: 'left',
        bold: true
      },

      {
        text: `本次学费结算期间为${object.dateRange.startDate}至${object.dateRange.endDate}。`
      },

      {
        text: '学生缴费情况:'
      },

      {
  			table: {
  				body: (convertFeesTable(object.feesDetail, object.feesInfo))
  			}
  		},

      {
        text: '学费结算情况:'
      },

      {
  			table: {
  				body: (feesSplitTable(object.feesInfo))
  			}
  		},

    ]

  }

  return docPDF

}

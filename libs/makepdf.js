let convertFeesTable = (feesDetail, extraAmount) => {

  console.log(feesDetail, extraAmount)

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
    ((!extraAmount) ? '' : extraAmount)
  ]

  centerView.push(extraRow)

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
    feesInfo.total,
    feesInfo.currentratio,
    feesInfo.lcenterAmount,
    feesInfo.xjturatio,
    feesInfo.xjtuamount
  ]

  view.push(dataRow)

  console.log(view)

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
  				body: (convertFeesTable(object.feesDetail, object.feesInfo.extraAmount))
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

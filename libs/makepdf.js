convertFeesTable = (arrayObject) => {

  console.log(arrayObject)

  let centerView = []

  _.forEach(arrayObject, function(center) {
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

  return centerView

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
  				body: (convertFeesTable(object.feesDetail))
  			}
  		}

    ]

  }

  return docPDF

}

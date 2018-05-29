convertFeesTable = (feesDetail, feesInfo) => {

  let centerView = []

  _.forEach(feesDetail, function(center) {
    // for each center in the list

    let header = [
      {text:`${center.name}`, colSpan: 4, alignment: 'center'},
      {},
      {},
      {}
    ]

    centerView.push(header)

    let headerName = [
      {text:`批次`, alignment: 'center'},
      {text:`人数`, alignment: 'center'},
      {text:`缴费方式`, alignment: 'center'},
      {text:`缴费金额`, alignment: 'center'}
    ]

    centerView.push(headerName)

    _.forEach(center.paymentdetail, function(payment, index) {
      let row = [
        {text:`${payment._id}`, alignment: 'center'},
        {text:`${payment.studentcount}`, alignment: 'center'},
        {text:`${(index == 0) ? '银联缴费' : ''}`, alignment: 'center'},
        {text:`${payment.totalFee}`, alignment: 'right'}
      ]
      centerView.push(row)
    })

  })

  // add extra at the end
  let extraRow = [
    '',
    '',
    {text:`汇款缴费`, alignment: 'center'},
    {text:`${(!feesInfo.extraAmount) ? '' : feesInfo.extraAmount}`, alignment: 'right'}
  ]

  centerView.push(extraRow)

  // push last sum row at the end

  let sumRow = [
    `合计`,
    ``,
    ``,
    {text:`${feesInfo.total}`, alignment: 'right'}
  ]

  centerView.push(sumRow)


  return centerView

}

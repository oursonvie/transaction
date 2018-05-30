feesSplitTable = (feesInfo) => {

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
    {text: '分配比例', alignment: 'center'},
    {text: `分配金额（元）`, alignment: 'center'},
    {text: '分配比例', alignment: 'center'},
    {text: '分配金额（元）', alignment: 'center'}
  ]

  view.push(secondRow)

  let dataRow = [
    {text: numberFormatter(feesInfo.total), alignment: 'right'},
    {text: percentageFormatter(feesInfo.currentratio), alignment: 'right'},
    {text: numberFormatter(feesInfo.lcenterAmount), alignment: 'right'},
    {text: percentageFormatter(feesInfo.xjturatio), alignment: 'right'},
    {text: numberFormatter(feesInfo.xjtuamount), alignment: 'right'},
  ]

  view.push(dataRow)

  //empty row

  let emptyRow = [' ', ' ', ' ', ' ', ' ']
  view.push(emptyRow)

  // sumrow
  let sumRow = [
    {text: `合计`, alignment: 'center'},
    ``,
    {text: `${numberFormatter(feesInfo.lcenterAmount)}`, alignment: 'right'},
    ``,
    {text: `${numberFormatter(feesInfo.xjtuamount)}`, alignment: 'right'},
  ]

  view.push(sumRow)

  return view
}

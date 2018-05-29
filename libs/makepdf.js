makeRenderObject = (object) => {
  console.log(object)

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
      }

    ]

  }

  return docPDF

}

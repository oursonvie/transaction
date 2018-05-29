// render function starts here
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
          widths: [60, 60, 60, '*'],
  				body: (convertFeesTable(object.feesDetail, object.feesInfo))
  			}
  		},

      {
        text: '学费结算情况:'
      },

      {
  			table: {
          widths: [60, 60, '*', 60, '*'],
  				body: (feesSplitTable(object.feesInfo))
  			}
  		},

      {
        text: '结算账户信息:'
      },

      {
  			table: {
          widths: [80, '*', 200],
  				body: (accountInfo(object.districtCenter.bankaccountdetail, object.xjtuAccount))
  			}
  		},

      {
  			table: {
          widths: [200, 200],
  				body: [
            [
              {text: `财务主管`, alignment: 'left'},
              {text: `复核`, alignment: 'left'}
            ]
          ]
  			},
        layout: 'noBorders'
  		},

    ]

  }

  return docPDF

}

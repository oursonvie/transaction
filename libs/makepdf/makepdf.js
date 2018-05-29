// render function starts here
makeRenderObject = (object) => {

  // start pdf formatting
  let docPDF = {

    // page setting
    pageSize: 'A4',

    content: [

      {
        text: '学费结算确认函',
        alignment: 'center',
        fontSize: 18
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
        fontSize: 10,
  			table: {
          widths: [80, 80, 100, '*'],
  				body: (convertFeesTable(object.feesDetail, object.feesInfo))
  			}
  		},

      {
        text: '学费结算情况:'
      },

      {
        fontSize: 10,
  			table: {
          widths: [60, 60, '*', 60, '*'],
  				body: (feesSplitTable(object.feesInfo))
  			}
  		},

      {
        text: '结算账户信息:'
      },

      {
        fontSize: 10,
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


      {
        text: '注意事项:'
      },

      {
        fontSize: 10,
        text: '1. 上述内容如有异议，请及时与联系人联系解决。'

      },

      {
        fontSize: 10,
        text: '2. 如无异议，请学习中心盖章确认并复函，以便尽早完成学费结算工作。'
      },

      {
        fontSize: 10,
        text: '3. 学习中心收到返款七日内为学校开出正式结算票据并寄给联系人。'
      },

      {
        fontSize: 10,
        text: '4. 学校在未收到学习中心上次返款结算票据之前，本次返款将推迟办理。'
      },

      {
        fontSize: 10,
        text: '5. 返歉发票抬头:西安交通大学继续教育学院; 内容:学费返还款'
      },

      {
        fontSize: 10,
        text: '6. 返款金额超过万元的，要附上发票真伪证明。同返款发票、确认函原件一并寄回高校。'
      }


    ]

  }

  return docPDF

}

Template.DLCenterDetail.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)
  Session.set('subActionType', false)
  Session.set('formType', 'disabled')

  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    // get view of perticular dcenter
    if (Session.get('action') && Session.get('action').type == 'view') {
      let id = Session.get('action').id

      PromiseMeteorCall('districtCenterPersonFees', id)
      .then(res => {

        //set fees detail put in session, also get extraAmount
        Session.set('feesDetail', res)

        // calculate fees detail with ratio
        let total = 0
        lodash.forEach(res, function(center) {
          total += lodash.sumBy(center.paymentdetail, 'totalFee')
        })

        // get feesInfo the further reference
        let feesInfo = {}
        feesInfo.extraAmount = DLearningCenter.findOne({_id:id}).extraAmount
        feesInfo.unionPay = total
        feesInfo.total = total + feesInfo.extraAmount
        feesInfo.lowratio = DLearningCenter.findOne({_id:id}).returnratio
        feesInfo.currentratio = getRatio(feesInfo.total, feesInfo.lowratio)

        Session.set('feesInfo', feesInfo)

      })
      .catch(err => {console.log(err)})
    }

  })

});

Template.DLCenterDetail.helpers({
  selectDlcenter: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  lcenterCount: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id}).sublearningcenter.length
  },
  feesInfo: function() {
    return Session.get('feesInfo')
  },
  numberDisplay: function(number) {
    let fixed = parseFloat(number).toFixed(2)
    return numberWithCommas(fixed)
  },
  simpleMultiple: function(value, ratio) {
    return value * ratio
  },
  returnAmount: function(total, ratio) {
    return Session.get('feesInfo').total * Session.get('feesInfo').currentratio
  },
  extraAmount: function() {
    return Session.get('extraAmount')
  }
});

Template.DLCenterDetail.events({
  'click .btn-photo': function() {
    Session.set('action', { type:'photo',  id: this._id} )
  },
  'click .btn-bankdetail': function() {
    Session.set('subActionType', 'editbankdetail')
  },
  'click .btn-lcenter': function() {
    Session.set('subActionType', 'editlearningcenter')
  },
  'click .btn-baseinfo': function() {
    Session.set('subActionType', 'baseinfo')
  },
  'click .btn-download-pdf': function() {

    // init make pdfMake
    pdfMake.fonts = {
     msyh: {
           normal: 'Microsoft YaHei.ttf',
           bold: 'Microsoft YaHei.ttf',
           italics: 'Microsoft YaHei.ttf',
           bolditalics: 'Microsoft YaHei.ttf'
        }
    }

    // date
    currentDate = moment().format('YYYY-MM-DD')
    splitDate = currentDate.split('-')
    date = `${splitDate[0]}年${splitDate[1]}月${splitDate[2]}日`

    // set target id
    lcenterId = this._id

    // init render object
    let renderObject = {
      name: this.bankaccountdetail.name,
      date: date,
      bankDetail: DLearningCenter.findOne({_id:lcenterId}).bankaccountdetail
    }

    // set download file name
    let downloadFileName = `${renderObject.name}.pdf`

    // get payment information
    PromiseMeteorCall('districtCenterPersonFees', lcenterId)
    .then(res => {
      // calculate fees detail with ratio
      let total = 0
      lodash.forEach(res, function(center) {
        total += lodash.sumBy(center.paymentdetail, 'totalFee')
      })

      // get feesInfo the further reference
      let feesInfo = {}
      feesInfo.extraAmount = DLearningCenter.findOne({_id:lcenterId}).extraAmount
      feesInfo.unionPay = total
      feesInfo.total = total + feesInfo.extraAmount
      feesInfo.lowratio = DLearningCenter.findOne({_id:lcenterId}).returnratio
      feesInfo.currentratio = getRatio(feesInfo.total, feesInfo.lowratio)

      moneyShot = feesInfo.total * feesInfo.currentratio

      renderObject.returnAmount = moneyShot.toFixed(2)
      // console.log(`moneyShot: ${moneyShot.toFixed(2)}`)

      try {
        // download pdf
        pdfMake.createPdf(printChongkuan(renderObject)).download(downloadFileName);

      } catch(err) {
        // record error
        console.error(err)
        console.log(err)
      }

    })
    .catch(err => {console.log(err)})

  }
})

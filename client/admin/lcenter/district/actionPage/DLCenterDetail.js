Template.DLCenterDetail.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)

  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    if (Session.get('action') && Session.get('action').type == 'view') {
      let id = Session.get('action').id
      PromiseMeteorCall('districtCenterPersonFees', id)
      .then(res => {

        //set fees detail put in session, also get extraAmount
        Session.set('feesDetail', res)

        // calculate fees detail with ratio
        let total = 0
        _.forEach(res, function(center) {
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
  feesObjects: function() {
    if (Session.get('feesDetail')) {
      return Session.get('feesDetail')
    }
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
  'click .btn-edit': function() {
    Session.set('action', { type:'edit',  id: this._id} )
  },
  'click .btn-photo': function() {
    Session.set('action', { type:'photo',  id: this._id} )
  }
})

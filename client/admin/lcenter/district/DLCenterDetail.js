Template.DLCenterDetail.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('returnRatio', false)
  Session.set('totalAmount', false)
  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    if (Session.get('action') && Session.get('action').type == 'view')
    PromiseMeteorCall('districtCenterPersonFees', Session.get('action').id)
    .then(res => {
      Session.set('feesDetail', res)
    })
    .catch(err => {console.log(err)})
  })

});

Template.DLCenterDetail.helpers({
  selectDlcenter: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  lcenterCount: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id}).sublearningcenter.length
  },
  totalFees: function() {
    if (Session.get('feesDetail')) {
      // sum array
      let arrayFees = Session.get('feesDetail')
      let total = 0

      _.forEach(arrayFees, function(center) {
        total += lodash.sumBy(center.paymentdetail, 'totalFee')
      })

      Session.set('totalAmount', total)

      return total
    }
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
  specialDCenter: function() {
    if (DLearningCenter.findOne({_id:Session.get('action').id}).sublearningcenter.length == 2) {
      return true
    } else {
      return false
    }
  },
  currentReturnRatio: function(value, lowestRatio) {
    let result = getRatio(value, lowestRatio)
    Session.set('returnRatio', result)
    return result
  },
  returnAmount: function(total, ratio) {
    return Session.get('returnRatio') * Session.get('totalAmount')
  }
});

Template.DLCenterDetail.events({
  'click .btn-edit': function() {
    Session.set('action', { type:'edit',  id: this._id} )
  }
})
